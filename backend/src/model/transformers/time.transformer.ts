import { Transform, TransformFnParams } from 'class-transformer';
import { BadRequestError } from 'routing-controllers';
import { Time } from '../../util/date.util';

/**
 * Transforms a string in the format HH:mm to a Time object
 */
export function ToTime(): (target: any, key: string) => void {
    return Transform((params: TransformFnParams) => {
        const { value } = params;

        if (typeof value !== 'string') {
            throw new BadRequestError('The value must be a string.');
        }

        const regex = /^(2[0-3]|1[0-9]|0[0-9]):([0-5][0-9])$/;
        if (regex.test(value)) {
            const [hours, minutes] = value.split(':').map(Number);
            return new Time(hours, minutes);
        }

        throw new BadRequestError('The value must be in the format HH:mm.');
    });
}
