import prisma from '../../prisma';

import { Service } from 'typedi';

@Service()
export class AccountService {
    async getUserByEmail(email: string) {
        return prisma.account.findUnique({
            where: {
                email: email,
            },
        });
    }
}
