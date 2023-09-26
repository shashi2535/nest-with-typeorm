import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/middleware/errorHandling';
import { UserCreateDto } from './dto/createUser.Dto';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/user')
  @UseInterceptors(TransformInterceptor)
  async createUser(@Body() userDto: UserCreateDto) {
    const data = await this.userService.createUser(userDto);
    return { message: 'User Created Successfully.', data };
  }
}
