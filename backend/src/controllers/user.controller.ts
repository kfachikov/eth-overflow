import { JsonController, Get, Req } from 'routing-controllers';
import { Service } from 'typedi';
import { AccountService } from '../services/user.service';
import { Request } from 'express';

@JsonController('/user')
@Service()
export class UserController {
    constructor(
        private userService: AccountService,
    ) {}

    @Get('/me')
    async getUser(@Req() req: Request) {
        // @ts-ignore
        return await this.userService.getUserById(req.userId);
    }
}
