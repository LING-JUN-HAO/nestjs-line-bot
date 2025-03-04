import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as line from '@line/bot-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const channelSecret = this.configService.get<string>('LINE_CHANNEL_SECRET');
    console.log('X-Line-Signature:', req.headers['x-line-signature']);
    if (!channelSecret) {
      console.error('Missing LINE_CHANNEL_SECRET');
      return res.status(500).send('Server error');
    }

    const middleware = line.middleware({ channelSecret });

    void middleware(req, res, (err) => {
      if (err) {
        console.error('LINE Webhook Middleware Error:', err);
        return res.status(401).send('Unauthorized');
      }
      next();
    });
  }
}
