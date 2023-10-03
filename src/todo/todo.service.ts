import { Injectable } from '@nestjs/common';
import { Todo, User } from 'src/model';
import { Repository } from 'typeorm';
import { TodoCreateDto } from './dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ImodifyRequest } from 'src/middleware';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepo: Repository<Todo>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async createTodo(req: ImodifyRequest, todoDto: TodoCreateDto) {
    try {
      const { description, title } = todoDto;
      const { user_id } = req;
      const userData = await this.userRepo.findOne({
        where: { user_uuid: user_id },
      });
      if (!userData) {
        return { message: 'User Not Exist.' };
      }
      const todo = this.todoRepo.create({
        description: description,
        title: title,
        todo_uuid: uuid(),
        users_todo: userData,
      });
      const todoData = await this.todoRepo.save(todo);
      return { message: 'Todo Created Successfully.', data: todoData };
    } catch (err) {
      return {
        message: err.message,
        status_code: 500,
      };
    }
  }
  async getTodoById(id) {
    try {
      const todoData = await this.todoRepo.findOne({
        where: { todo_uuid: id },
        relations: {
          users_todo: true,
        },
      });
      return { message: 'Get Todo By Id Successfully', data: todoData };
    } catch (err) {
      console.log('err>>>>', err);
      return { message: err.message, status_code: 500 };
    }
  }
}
