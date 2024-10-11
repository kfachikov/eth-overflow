import { Picture } from '@prisma/client';
import prisma from '../../../prisma';

import { Service } from 'typedi';

@Service()
export class PictureService {
    /**
     * Create a picture entity in the database
     *
     * @param picturePath the path to the picture
     * @returns the created picture entity
     */
    async createPictureEntity(picturePath: string): Promise<Picture> {
        return await prisma.picture.create({
            data: {
                url: picturePath,
            }
        });
    }

    /**
     * Delete a picture entity from the database
     *
     * @param pictureId the id of the picture to delete
     * @returns the deleted picture entity
     */
    async deletePictureEntity(pictureId: number): Promise<Picture> {
        return await prisma.picture.delete({
            where: {
                id: pictureId,
            },
        });
    }
}
