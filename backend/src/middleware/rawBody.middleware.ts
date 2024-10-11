import 'reflect-metadata';
import * as express from 'express';
import { Service } from 'typedi';
import { BadRequestError, ExpressMiddlewareInterface } from 'routing-controllers';

@Service()
export class ParseRawBodyForMollieMiddleware implements ExpressMiddlewareInterface {
    use(req: express.Request, _: express.Response, next: express.NextFunction): void {
        let rawBody = '';
        req.on('data', (chunk) => {
            rawBody += chunk;
        });
        req.on('end', () => {
            if (!rawBody.startsWith('id=')) {
                next(new BadRequestError('Invalid request body'));
            }
            const id = (rawBody).substring(3);
            req.body = { id: id };
            next();
        });
    }
}
