import { Transform, TransformFnParams } from 'class-transformer';
import { isISO8601 } from 'class-validator';
import { BadRequestError } from 'routing-controllers';
import { includesTimezoneInformation } from '../validators/IsUnambigousDateString.validator';

/**
 * Transforms a string or a number to an unambiguous Date object, meaning that it must include timezone information o be an exact epoch timestamp (in milliseconds).
 */
export function ToDate(): (target: any, key: string) => void {
    return Transform((params: TransformFnParams) => {
        const { value } = params;

        if (typeof value === 'string') {
            if (!isISO8601(value, { strict: true })) {
                throw new BadRequestError('The value must follow the ISO 8601 if it is a string.');
            }

            if (includesTimezoneInformation(value)) {
                return new Date(value);
            }

            throw new BadRequestError('The value must be in the format YYYY-MM-DD((THH:mm:ss.sss((+/-)HH:mm|Z))|Z).');
        }

        if (typeof value === 'number') {
            return new Date(value);
        }

        throw new BadRequestError('The value must be a string or a number.');
    });
}
