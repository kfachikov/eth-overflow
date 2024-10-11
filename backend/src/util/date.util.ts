import { BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';

export interface Frame { startDate: Date, endDate: Date }

export class Time {
    constructor(private hours: number, private minutes = 0, private seconds = 0) {
        if (hours < 0 || hours > 23) throw new Error('Invalid hours');
        if (minutes < 0 || minutes > 59) throw new Error('Invalid minutes');
        if (seconds < 0 || seconds > 59) throw new Error('Invalid seconds');
    }

    /**
     * Get the value of the time in seconds.
     *
     * @returns the value of the time in seconds
     */
    valueOf(): number {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    /**
     * Check if a time is between two times.
     *
     * @param start the start time, represented as a number of seconds since the start of the day (can be acquired using valueOf())
     * @param end the end time, represented as a number of seconds since the start of the day (can be acquired using valueOf())
     * @returns true if the time is between the start and end time, false otherwise
     */
    isTimeBetween(start: number, end: number): boolean {
        const value = +this;
        return value >= start && value <= end;
    }

    /**
     * Add the time to a date.
     *
     * @param date the date to add the time to
     * @returns the date with the time added
     */
    addToDate(date: Date): Date {
        return new Date(date.getTime() + this.valueOf() * 1000);
    }

    /**
     * Set the time of date in a given timezone.
     *
     * @param date the date to set the time to
     * @param timezone the timezone to set the time in
     * @returns the date with the time set
     */
    setToDateInTimezone(date: Date, timezone: string): Date {
        const midnightDate = new Date(date.getTime() - +Time.timeForTimezone(date, timezone) * 1000 - date.getUTCMilliseconds());
        return this.addToDate(midnightDate);
    }

    /**
     * Subtract the time from a date.
     *
     * @param date the date to subtract the time from
     * @returns the date with the time subtracted
     */
    removeFromDate(date: Date): Date {
        return new Date(date.getTime() - this.valueOf() * 1000);
    }

    /**
     * Create a time instance from a number of seconds.
     *
     * @param seconds the time in seconds
     * @returns the time instance
     */
    static fromSeconds(seconds: number): Time {
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        return new Time(hours, minutes, seconds);
    }

    /**
     * Create a time instance from a date and a timezone.
     *
     * @param date the date to get the time from
     * @param timezone the timezone to get the time in
     * @returns the time instance
     */
    static timeForTimezone(date: Date, timezone: string): Time {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const parts = formatter.formatToParts(date);

        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        for (const part of parts) {
            if (part.type === 'hour') hours = Number(part.value);
            if (part.type === 'minute') minutes = Number(part.value);
            if (part.type === 'second') seconds = Number(part.value);
        }

        hours = hours % 24;

        return new Time(hours, minutes, seconds);
    }
}

@Service()
export class DateUtil {
    private static days = {
        sun: 0,
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6,
    };

    readonly DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
    private readonly MAXIMUM_OVERVIEW_PERIOD_IN_DAYS = 180;

    /**
     * Get the dates between two dates (in a specific timezone) (including) for a given day.
     *
     * @param start start date
     * @param end end date
     * @param timezone timezone
     * @param dayName day in English (case insensitive)
     * @returns array of dates
     * @throws if day is invalid
     */
    getDaysBetweenDates(start: Date, end: Date, timezone: string, dayName: string): Date[] {
        const dayNameShort = dayName.toLowerCase().substring(0, 3);
        if (dayNameShort in DateUtil.days == false)
            throw new Error('Invalid day name');

        const result = [];

        const day = DateUtil.days[dayNameShort as keyof typeof DateUtil.days];

        const current = new Date(start.getTime());
        const currentDayNameShort = current.toLocaleString('en-US', { timeZone: timezone, weekday: 'short' }).toLowerCase();
        const currentDay = DateUtil.days[currentDayNameShort as keyof typeof DateUtil.days];

        current.setUTCDate(current.getUTCDate() + ((day - currentDay + 7) % 7));

        while (current.getTime() <= end.getTime()) {
            result.push(new Date(+current));
            current.setUTCDate(current.getUTCDate() + 7);
        }

        return result;
    }

    /**
     * Get duration apart dates between two dates.
     * The first date is the equivalent to the start date. Every other is duration minutes later.
     *
     * @param start start date
     * @param end end date
     * @param duration duration in minutes
     * @returns array of dates
     */
    getTimeMinutesDurationApartBetweenDates(start: Date, end: Date, duration: number): Date[] {
        const result = [];

        let current = new Date(start);

        const endDate = new Date(end.getTime() - duration * 60 * 1000);

        while (current <= endDate) {
            result.push(new Date(current));
            current = new Date(current.getTime() + duration * 60 * 1000);
        }

        return result;
    }

    /**
     * Check if a date is in the past.
     *
     * @param date the date to check
     * @param timezone the timezone of the date
     * @returns true if the date is in the past, false otherwise
     */
    isDateInThePast(date: Date, timezone: string): boolean {
        const dateEnd = new Time(23, 59, 59).setToDateInTimezone(new Date(date), timezone);
        return dateEnd.getTime() < new Date().getTime();
    }

    /* Assert whether a date is between two dates.
     * @param start Start date for the period to check against
     * @param end End date for the period to check against
     * @param date Date to check
     * @returns true if the date is between the start and end dates, false otherwise
     */
    assertDateBetweenDates(start: Date, end: Date, date: Date): boolean {
        return date >= start && date <= end;
    }

    /**
     * check if date is today
     * @param date the date to check with today
     * @returns when date it today return true, when not return false
     */
    isToday(date: Date, timezone: string): boolean {
        const today = new Time(0).setToDateInTimezone(new Date(), timezone);
        return date.getDate() == today.getDate()
          && date.getMonth() == today.getMonth()
          && date.getFullYear() == today.getFullYear();
    }

    /**
     * Return true if the time range between the two dates is larger than n days.
     *
     * @param {Date} startDate start date
     * @param {Date} endDate end date
     * @param {number} maxDays days in range
     * @returns {boolean} is the time range larger than n days
     * @throws {BadRequestError} if start date is greater than end date
     */
    isTimeRangeLargerThanNDays(startDate: Date, endDate: Date, maxDays: number): boolean {
        if (startDate > endDate) {
            throw new BadRequestError('Start date is greater than end date');
        }
        return Math.abs(startDate.getTime() - endDate.getTime()) > maxDays * 24 * 60 * 60 * 1000;
    }

    /**
     * Get ticks from date
     *
     * @param date date to convert to ticks
     * @return ticks of date
     */
    getTicksFromDate(date: Date) {
        return ((date.getTime() * 10000) + 621355968000000000);
    }
    
    /**
     * Computes the years that are between two dates both bounds inclusive
     *
     * @param frame the frame of time
     * @returns the years that are between two dates
     */
    computeYearsBetweenDates(frame: Frame): number[] {
        const startYear = frame.startDate.getFullYear();
        const endYear = frame.endDate.getFullYear();
        const years: number[] = [];

        for (let year = startYear; year <= endYear; year += 1) {
            years.push(year);
        }

        return years;
    }
}
