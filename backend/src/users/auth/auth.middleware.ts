import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('Unauthorized', 401);
    }

    if (authorization != 'Bearer mysecuretoken') {
      throw new HttpException('Forbidden', 403);
    }

    next();
  }
}
