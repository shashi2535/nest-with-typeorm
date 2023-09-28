import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseHandlerInterceptor } from './middleware/errorHandling';

// import { useContainer } from 'class-validator';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseHandlerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log(validationErrors);
        return new BadRequestException(
          Object.values(validationErrors[0].constraints)[0],
        );
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
