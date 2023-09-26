import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/createUser.Dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(userDto: UserCreateDto): Promise<any> {
    try {
      const userCreateData = this.userRepository.create({
        first_name: userDto.first_name,
        email: userDto.email,
        user_uuid: uuid(),
      });
      const userData = await this.userRepository.save(userCreateData);
      return userData;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }
}
