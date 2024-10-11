import { Service } from 'typedi';

@Service()
export class DuplicateEntriesUtil {
    /**
     * check if entries are duplicates
     * @param entries array of numbers
     * @returns true when numbers are duplicate, false when values are unique
     */

    areDuplicateEntries(
        entries: number[]
    ): boolean {
        return entries.some((e, i, arr) => arr.indexOf(e) !== i);
    }
}
