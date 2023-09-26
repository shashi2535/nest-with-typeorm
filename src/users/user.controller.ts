import { Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/user')
  async createUser(@Req() req, @Res() res) {
    return await this.userService.createUser(req, res);
  }
}
