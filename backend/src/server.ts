import  'reflect-metadata';

import { Express } from 'express';

import { createExpressServer, useContainer } from 'routing-controllers';
import path from 'path';

import { Container } from 'typedi';
import { CorsOptions } from 'cors';
import { CorsService } from './services/cors.service';
import {TokenMiddleware} from "./middleware/token.middleware";
import {AuthenticationMiddleware} from "./middleware/authentication.middleware";
import {HttpErrorHandler} from "./middleware/error.middleware";

useContainer(Container);

const corsService = Container.get(CorsService);

const app = createExpressServer({
    cors: {
        origin: (origin: string | undefined, callback) => {
            if (origin === undefined) {
                return callback(null, true);
            }

            corsService.isOriginAllowed(origin)
                .then((allowed) => {
                    callback(null, allowed);
                }).catch(() => {
                    callback(null, false);
                });
        },
        allowedHeaders: ['Authorization', 'Content-Type'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    } as CorsOptions,
    routePrefix: '/api',
    defaultErrorHandler: false,
    middlewares: [
        TokenMiddleware,
        AuthenticationMiddleware,
        HttpErrorHandler,
    ],
    controllers: [path.join(__dirname + '/controllers/**/*')],
}) as Express;

export default app;
