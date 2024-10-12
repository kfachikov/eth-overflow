import { Prisma } from '@prisma/client';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import HttpStatus from 'http-status-codes';
import { ErrorDto } from '../model/error.model';
import { Request, Response } from 'express';

@Service()
@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    /**
     * Handles the error and returns the appropriate response
     * Propagates HTTP errors, transforms Prisma P2025 error into NotFoundError
     * and returns a generic error for all other errors
     *
     * @param err the error that occurred
     * @param _req the request
     * @param res the response
     * @param next the next middleware
     * @returns the response
     */
    error(err: Error, _req: Request, res: Response, next: (err: Error) => Response | void) {
        console.log(err);
        if (err instanceof HttpError) {
            return res.status(err.httpCode).json(err);
        }
        else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == 'P2025') {
            return res.status(HttpStatus.NOT_FOUND).json({
                name: 'NotFoundError',
                message: 'Resource not found',
            } as ErrorDto);
        }

        if (process.env.NODE_ENV === 'development') {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                name: err.name,
                message: err.message,
                stack: err.stack,
                cause: err.cause,
            });
        }

        if (err instanceof Prisma.PrismaClientValidationError) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                name: 'ValidationError',
                message: 'Check request body',
            } as ErrorDto);
        }
        else if (err instanceof Prisma.PrismaClientKnownRequestError
          || err instanceof Prisma.PrismaClientUnknownRequestError
          || err instanceof Prisma.PrismaClientRustPanicError
          || err instanceof Prisma.PrismaClientInitializationError) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                name: 'InternalServerError',
                message: 'Something went wrong',
            } as ErrorDto);
        }

        next(err);
    }
}
