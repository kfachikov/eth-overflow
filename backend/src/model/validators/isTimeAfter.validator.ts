import {
    buildMessage,
    ValidateBy,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

/**
 * Checks if the time is after the time of a given property
 * The time is in the format HH:mm
 *
 * @param property the property to compare against
 * @param options the validation options
 * @returns the validation decorator
 */
export const IsTimeAfter = (
    property: string,
    options?: ValidationOptions
): PropertyDecorator =>
    ValidateBy(
        {
            name: 'IsTimeAfter',
            constraints: [property],
            validator: {
                validate: (
                    value: string,
                    args: ValidationArguments
                ): boolean => {
                    const regex = /^(2[0-3]|1?[0-9]|0?[0-9]):([0-5]?[0-9])$/;

                    const [relatedPropertyName] = args.constraints as [string];
                    const relatedValue = (
                        args.object as Record<string, unknown>
                    )[relatedPropertyName] as string;

                    if (regex.test(value) && regex.test(relatedValue)) {
                        const [hours, minutes] = value.split(':').map(Number);
                        const [relatedHours, relatedMinutes] = relatedValue.split(':').map(Number);

                        if (
                            hours > relatedHours
                            || (hours === relatedHours
                            && minutes >= relatedMinutes)
                        ) {
                            return true;
                        }
                        return false;
                    }
                    else {
                        return false;
                    }
                },
                defaultMessage: buildMessage(
                    (each: string): string =>
                        each
                        + '$property must be greater than or equal to $constraint1',
                    options
                ),
            },
        },
        options
    );
