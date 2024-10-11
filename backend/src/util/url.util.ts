import { Request } from 'express';
import { Service } from 'typedi';

@Service()
export class UrlUtil {
    /**
     * Get full URL from request
     *
     * @param req the request object
     * @returns the full URL
     */
    getFullUrlFromRequest(req: Request): string {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    }

    /**
     * Get hostname from request
     *
     * @param req the request object
     * @returns the full URL
     */
    getHostname(req: Request): string {
        return req.protocol + '://' + req.get('host');
    }
}
