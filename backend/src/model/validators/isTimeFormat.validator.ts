import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

/**
 * Verify whether a property is in HH:mm format
 *
 * @returns boolean indicating whether the formatting is correct
 */
export const IsTimeFormat = (options?: ValidationOptions): PropertyDecorator =>
    ValidateBy(
        {
            name: 'IsTimeFormat',
            validator: {
                validate: (value: string): boolean => {
                    const regex = /^(2[0-3]|1?[0-9]|0?[0-9]):([0-5]?[0-9])$/;
                    return typeof value === 'string' && regex.test(value);
                },
                defaultMessage: buildMessage(
                    (each: string): string =>
                        each
                        + '$property must be in the following format HH:mm',
                    options
                ),
            },
        },
        options
    );
