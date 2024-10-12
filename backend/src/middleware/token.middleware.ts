import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {Service} from "typedi";
import {verify} from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secretKey: string = process.env.JWT_SECRET_KEY!;
console.log(secretKey)

@Service()
@Middleware({ type: 'before' })
export class TokenMiddleware implements ExpressMiddlewareInterface {

    use(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = verify(token, secretKey);
                // @ts-ignore
                const { userId } = decoded;
                // @ts-ignore
                req.userId = userId;
            } catch (err) {
                res.locals.needAuthentication = true;
            }
        } else {
            res.locals.needAuthentication = true;
        }
        next();
    }
}