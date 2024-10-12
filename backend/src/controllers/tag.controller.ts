import { JsonController, Post, Put, Delete, Get, Param, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { TagService } from '../services/tag.service';
import { TagCreateDto, TagUpdateDto } from '../model/tag.model';

@JsonController('/tags')
@Service()
export class TagController {
    constructor(private tagService: TagService) {}

    @Post('/')
    async createTag(@Body() tagCreateDto: TagCreateDto) {
        return await this.tagService.createTag(tagCreateDto);
    }

    @Put('/:tagId')
    async updateTag(@Param('tagId') tagId: number, @Body() tagUpdateDto: TagUpdateDto) {
        return await this.tagService.updateTag(tagId, tagUpdateDto);
    }

    @Delete('/:tagId')
    async deleteTag(@Param('tagId') tagId: number) {
        return await this.tagService.deleteTag(tagId);
    }

    @Get('/')
    async getTags() {
        return await this.tagService.getTags();
    }
}
