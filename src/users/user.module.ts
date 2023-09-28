import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'iamuser',
      signOptions: { expiresIn: '1d' },
    }),
    CloudinaryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
