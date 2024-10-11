import { Service } from 'typedi';

@Service()
export class CorsService {
    /**
     * The allowed origins for the application
     */
    private allowedOrigins: string[] | undefined;

    /**
     * Creates a layout for a location
     *
     * @param locationId the id of the location
     * @param layout the layout to be created
     * @returns the created layout
     */
    async isOriginAllowed(origin: string): Promise<boolean> {
        if (!this.allowedOrigins) {
            this.allowedOrigins = await this.getAllowedOrigins();
        }

        if (this.allowedOrigins.includes(origin)) {
            return true;
        }

        return false;
    }

    /**
     * The FRONTEND_URL is loaded from the environment variables
     *
     * @returns the allowed origins
     */
    private async getAllowedOrigins(): Promise<string[]> {
        const links = [];

        if (process.env.FRONTEND_URL) {
            links.push(process.env.FRONTEND_URL);
        }

        return links;
    }
}
