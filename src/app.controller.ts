import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { lineConfig } from './config/line.config';
import { Client } from '@line/bot-sdk';
import { Request, Response } from 'express';

@Controller('webhook')
export class AppController {
  private readonly lineClient: Client;

  constructor(private readonly appService: AppService) {
    this.lineClient = new Client({
      channelAccessToken: lineConfig.channelAccessToken,
      channelSecret: lineConfig.channelSecret,
    });
  }

  @Post('')
  handleWebhook(@Req() req: Request, @Res() res: Response): void {
    console.log('req.body', req.body.events);

    // 處理每個事件
    // const results = events.map(async (event) => {
    //   const replyToken = event.replyToken;

    //   // 呼叫服務處理事件
    //   const replyMessage = this.appService.handleEvent(event);

    //   // 回覆訊息給 LINE
    //   return this.lineClient.replyMessage(replyToken, {
    //     type: 'text',
    //     text: replyMessage,
    //   });
    // });

    // // // 等待所有事件處理完成
    // await Promise.all(results);

    res.status(HttpStatus.OK).send('OK');
  }
}
