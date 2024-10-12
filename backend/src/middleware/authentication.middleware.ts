import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {Service} from "typedi";

@Service()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {

    use(req: Request, res: Response, next: NextFunction): void {
        console.log("sssssHELLOO----");
        console.log(req.headers);
        console.log(req.headers['x-authentik-email']);
        console.log(`${req.method} ${req.url}`);
        next();
    }
}