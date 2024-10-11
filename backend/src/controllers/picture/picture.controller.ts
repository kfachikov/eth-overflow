import { JsonController, Post, UploadedFile } from 'routing-controllers';
import { Service } from 'typedi';
import { PictureService } from '../../services/picture/picture.service';
import { pictureUploadOptions, UploadPictureResponse } from '../../model/picture/picture.model';

@JsonController('/pictures')
@Service()
export class PictureController {
    constructor(
        private pictureService: PictureService,
    ) {}

    /**
     * Upload a picture
     *
     * @param picture the picture to upload
     * @returns the id of the uploaded picture
     */
    @Post('/')
    async uploadPicture(@UploadedFile('picture', { options: pictureUploadOptions, required: true }) picture: Express.Multer.File): Promise<UploadPictureResponse> {
        const picturePath = picture.path;
        const pictureEntity = await this.pictureService.createPictureEntity(picturePath);
        return { id: pictureEntity.id };
    }
}
