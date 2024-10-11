import { Service } from 'typedi';
import crypto from 'crypto';

@Service()
export class StringUtil {
    /**
     * Generate a random string of a given length with [A-Z0-9]
     *
     * @param length the length of the string
     * @returns the random string
     */
    generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;

        return Array.from(crypto.randomBytes(length), byte =>
            characters[byte % charactersLength]
        ).join('');
    }
}
