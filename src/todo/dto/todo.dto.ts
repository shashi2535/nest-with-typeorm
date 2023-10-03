import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TodoCreateDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}
