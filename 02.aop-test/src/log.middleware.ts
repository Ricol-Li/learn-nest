import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('LogMiddleware -- before', req.url);
    next();
    console.log('LogMiddleware -- after');
  }
}
