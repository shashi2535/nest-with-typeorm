import {
  Body,
  Controller,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  LoginDto,
  UpdateUseProfileDto,
  UserCreateDto,
} from './dto/createUser.Dto';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  @UseInterceptors(FileInterceptor('File', { storage: diskStorage({}) }))
  async createUser(
    @Body() userDto: UserCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: true,
      }),
    )
    File: Express.Multer.File,
  ) {
    return this.userService.createUser(userDto, File);
  }

  @Post('/login')
  async login(@Body() userDto: LoginDto) {
    return this.userService.login(userDto);
  }

  @Put('/update_profile/:id')
  @UseInterceptors(FileInterceptor('avtar', { storage: diskStorage({}) }))
  async update_user_profile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userDto: UpdateUseProfileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: true,
      }),
    )
    avtar: Express.Multer.File,
  ) {
    return this.userService.updateUser(id, userDto, avtar);
  }
}
