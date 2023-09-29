import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model';
import { Repository } from 'typeorm';
import {
  LoginDto,
  UpdateUseProfileDto,
  UserCreateDto,
} from './dto/createUser.Dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { HttpStatus } from 'src/constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cloudinary: CloudinaryService,
    private jwtService: JwtService,
  ) {}
  async createUser(
    userDto: UserCreateDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const saltOrRounds = 10;
      const password = userDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const checkUserExist = await this.userRepository.findOne({
        where: { email: userDto.email },
      });
      if (checkUserExist) {
        return { message: 'User Already Exist' };
      }
      const uploadedFile = await this.cloudinary.uploadImage(file.path);
      const userCreateData = this.userRepository.create({
        first_name: userDto.first_name,
        email: userDto.email,
        user_uuid: uuid(),
        password: hash,
        avtar: uploadedFile.secure_url,
        public_id: uploadedFile.public_id,
        role: userDto.email === 'admin@yopmail.com' ? 'admin' : 'user',
      });
      const userData = await this.userRepository.save(userCreateData);
      return { message: 'User Created Successfully.', data: userData };
    } catch (err) {
      return {
        message: err.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async login(userDto: LoginDto) {
    try {
      const { email, password } = userDto;
      const checkUserNotExist = await this.userRepository.findOne({
        where: { email },
      });
      if (!checkUserNotExist) {
        return { message: 'Please Signup' };
      }
      const passwordMatch = await bcrypt.compare(
        password,
        checkUserNotExist.password,
      );
      if (!passwordMatch) {
        return { message: 'Invalid Creadential' };
      }
      const payload = {
        id: checkUserNotExist.user_uuid,
      };
      return {
        message: 'Login Successfully',
        data: {
          access_token: await this.jwtService.signAsync(payload),
        },
      };
    } catch (err) {
      return { message: err.message, statusCode: 500 };
    }
  }
  async updateUser(
    id: string,
    userDto: UpdateUseProfileDto,
    avtar: Express.Multer.File,
  ) {
    try {
      const { first_name } = userDto;
      const userData = await this.userRepository.findOne({
        where: { user_uuid: id },
      });
      if (!userData) {
        return { message: 'User Not Found' };
      }
      const uploadedFile = await this.cloudinary.updateImage(
        avtar.path,
        userData.public_id,
      );
      userData.first_name = first_name;
      userData.avtar = uploadedFile.secure_url;
      userData.public_id = uploadedFile.public_id;
      const updatedData = await this.userRepository.save(userData);
      return { message: 'User Updated Successfully', data: updatedData };
    } catch (err) {
      return { message: err.message, statusCode: 500 };
    }
  }
}
