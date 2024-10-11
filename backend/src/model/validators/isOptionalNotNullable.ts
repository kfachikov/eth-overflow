import { IsOptional, ValidateIf, ValidationOptions } from 'class-validator';

export function IsOptionalNonNullable(data?: {
    nullable: boolean
    validationOptions?: ValidationOptions
}) {
    const { nullable = false, validationOptions = undefined } = data ?? {};

    if (nullable) {
        return IsOptional(validationOptions);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ValidateIf((_ob: any, v: any) => {
        return v !== undefined;
    }, validationOptions);
}
