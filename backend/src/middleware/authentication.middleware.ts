import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {Service} from "typedi";
import dotenv from 'dotenv';
import {sign} from "jsonwebtoken";
import prisma from '../../prisma';

dotenv.config();

const secretKey: string = process.env.JWT_SECRET_KEY!;

@Service()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (res.locals.needAuthentication) {
            console.log(JSON.stringify(req.headers));
            const email: string = req.headers['x-authentik-email'] as string;
            // TODO: change at the end
            // const email = "xxx@student.ethz.ch"

            let user = await prisma.account.findUnique({ where: { email } });
            if (!user) {
                // TODO: change at the end
                const name: string = req.headers['x-authentik-name'] as string;
                const username: string = req.headers['x-authentik-username'] as string;
                // const name = "xxx"
                // const username = "xxx"

                user = await prisma.account.create({
                    data: {
                        email: email,
                        name: name,
                        username: username,
                    }
                })
            }

            // @ts-ignore
            req.userId = user.id;

            const token = sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

            res.setHeader('Authorization', `Bearer ${token}`);
            res.locals.token = token;
        }
        next()
    }
}