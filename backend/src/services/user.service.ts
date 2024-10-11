import prisma from '../../prisma';

import { Service } from 'typedi';

@Service()
export class AccountService {
    async getUserByEmail(email: string) {
        return await prisma.account.findFirst({
            where: {
                email: email,
            },
        });
    }
}
