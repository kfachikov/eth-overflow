import { ValidateBy, ValidationOptions, buildMessage, ValidationArguments } from 'class-validator';

export const IsLarger = (property: string, options?: ValidationOptions): PropertyDecorator =>
    ValidateBy(
        {
            name: 'IsLarger',
            constraints: [property],
            validator: {
                validate: (value: number, args: ValidationArguments): boolean => {
                    const [relatedPropertyName] = args.constraints as [string];
                    const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName] as number;
                    return value > relatedValue;
                },
                defaultMessage: buildMessage((each: string): string => each + '$property must be greater than $constraint1', options),
            },
        },
        options,
    );
