import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface ImodifyRequest extends Request {
  user_id: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: ImodifyRequest, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        return res.json({
          message: 'Unauthorized',
          staus_code: 400,
        });
      }
      const token = req.headers.authorization;
      const realToken = token.split(' ')[1];
      const data = (await verify(realToken, 'iamuser')) as JwtPayload;
      req.user_id = String(data.id);
      next();
    } catch (err) {
      return res.json({
        message: err.message,
        staus_code: 400,
      });
    }
  }
}
