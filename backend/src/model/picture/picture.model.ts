import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { v4 as uuidv4 } from 'uuid';

/**
 * Class defining the picture response structure
 */
export class UploadPictureResponse {
    id: number;
}

/**
 * Type defining the filename callback.
 */
type FileNameCallback = (error: Error | null, filename: string) => void;

/**
 * Multer options for file uploads
 */
export const pictureUploadOptions = {
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
            const extArray = file.mimetype.split('/');
            const extension = extArray[extArray.length - 1];
            callback(null, uuidv4() + '.' + extension);
        },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, acceptFile: FileFilterCallback) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
        ];

        acceptFile(null, allowedMimeTypes.includes(file.mimetype));
    },
    limits: {
        fileSize: 1024 * 1024 * 2, // Approximately 2 megabytes
    },
};
