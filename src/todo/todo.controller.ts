import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { TodoCreateDto } from './dto';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(public todoservice: TodoService) {}

  @Post()
  async createTodo(@Req() req, @Body() todoDto: TodoCreateDto) {
    return this.todoservice.createTodo(req, todoDto);
  }
  @Get('/:id')
  async getTodoById(@Param('id', ParseUUIDPipe) id: string) {
    return this.todoservice.getTodoById(id);
  }
}
