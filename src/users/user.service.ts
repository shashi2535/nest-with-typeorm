import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from 'src/model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(req: Request, res: Response): Promise<any> {
    const userCreateData = this.userRepository.create({
      first_name: 'shashi',
      email: 'shashi200@yopmail.com',
      user_uuid: '8879855dfs555',
    });
    const userData = await this.userRepository.save(userCreateData);
    return res.json({
      message: 'user created successfully',
      data: userData,
    });
  }
}
