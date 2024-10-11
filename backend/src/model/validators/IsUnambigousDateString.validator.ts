import { ValidateBy, ValidationOptions, buildMessage, isDateString } from 'class-validator';

export function includesTimezoneInformation(value: string): boolean {
    const regex = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z))))$/;

    return regex.test(value);
}

/**
 * Validates ISO 8601 date strings that contain timezone information explicitly.
 */
export function IsUnambigousDateString(
    validationOptions?: ValidationOptions
): PropertyDecorator {
    return ValidateBy({
        name: 'IsUnambigousDateString',
        constraints: [],
        validator: {
            validate: (value): boolean => isDateString(value, { strict: true }) && includesTimezoneInformation(value as string),
            defaultMessage: buildMessage(
                eachPrefix => eachPrefix + '$property must be a valid ISO 8601 date string with timezone information',
                validationOptions
            ),
        },
    },
    validationOptions
    );
}
