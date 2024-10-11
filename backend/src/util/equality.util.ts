import assert from 'assert';
import { Service } from 'typedi';

@Service()
export class EqualityUtil {
    /**
     * Tests for deep equality between the actual and expected parameters.
     *
     * @param actual the first object
     * @param expected the second object
     * @returns true if the objects are equal, false otherwise
     */
    deepEqual(actual: unknown, expected: unknown): boolean {
        try {
            assert.deepEqual(actual, expected);
            return true;
        }
        catch (_) {
            return false;
        }
    }
}
