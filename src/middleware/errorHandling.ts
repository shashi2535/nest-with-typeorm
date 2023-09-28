import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IcustomeResponse<T> {
  statusCode: number;
  result: T;
  error?: T;
}

@Injectable()
export class ResponseHandlerInterceptor<T>
  implements NestInterceptor<T, IcustomeResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IcustomeResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: data.statusCode ? data.statusCode : data.data ? 200 : 400,
        message: data.message,
        result: data.data ? data.data : {},
      })),
    );
  }
}

// @Catch(HttpException)
// export class ErrorRequestException implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus(); // Get the HTTP status code from the exception
//     // customData: exception.getResponse()['customData']
//     response.status(status).json({
//       statusCode: 400,
//       message: exception.message,
//     });
//   }
// }
