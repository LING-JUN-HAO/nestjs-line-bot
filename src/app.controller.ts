import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { lineConfig } from './config/line.config';
import { Client, WebhookEvent, MessageAPIResponseBase } from '@line/bot-sdk';
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
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const events: WebhookEvent[] = req.body.events;
    console.log('events', events);
    if (Array.isArray(events && events.length === 0)) {
      res.status(HttpStatus.OK).send('OK');
    }

    const test = async (event: WebhookEvent) => {
      if (event?.type === 'message') {
        const messageType = event.message.type;
        const replyToken = event.replyToken;
        if (messageType === 'text') {
          // const userMessage = event.message.text;
          // const replyMessage = this.appService.templateButtonMessageReply(
          //   '請選出屬於你的幸運數字吧',
          //   '下面有四個選項，只有一個屬於你',
          // );
          const replyMessage = this.appService.videoMessageReply(
            'https://video-previews.elements.envatousercontent.com/h264-video-previews/defb8e5c-0743-44d6-9ee5-1f86815b1037/47548052.mp4',
            'https://i.ytimg.com/vi/5RKNYLZqcKA/hqdefault.jpg',
          );
          try {
            // 使用 replyToken 回覆訊息
            const response: MessageAPIResponseBase =
              await this.lineClient.replyMessage(replyToken, replyMessage);
            console.log('回應成功', response);
          } catch (error) {
            console.error('回應失敗', error);
          }
        }
      }
    };

    await test(events[0]);
    res.status(HttpStatus.OK).send('OK');
  }
}
