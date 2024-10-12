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

    async getUserById(id: number) {
        return prisma.account.findUnique({
            where: {
                id: id,
            },
        });
    }
}
