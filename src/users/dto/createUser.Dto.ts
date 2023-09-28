import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  first_name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}

export class UpdateUseProfileDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
}
