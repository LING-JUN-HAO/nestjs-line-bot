import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as line from '@line/bot-sdk';

@Injectable()
export class LineMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    void line.middleware({ channelSecret: process.env.CHANNEL_SECRET! })(
      req,
      res,
      (err: unknown) => {
        if (err) {
          console.error('LINE Webhook Middleware Error:', err);
          return res.status(401).send('Unauthorized');
        }
        next();
      },
    );
  }
}
