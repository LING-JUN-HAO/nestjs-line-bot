import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { lineConfig } from './config/line.config';
import * as line from '@line/bot-sdk';
import { Request, Response } from 'express';

@Controller('webhook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  lineClient = new line.messagingApi.MessagingApiClient({
    channelAccessToken: lineConfig.channelAccessToken,
  });

  @Post('')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const events = req.body.events;
    console.log('events', events);
    if (events.length === 0) {
      res.status(HttpStatus.OK).send('OK');
    }

    const handler = async (event: line.WebhookEvent) => {
      if (event?.type === 'message') {
        const messageType = event.message.type;
        const replyToken = event.replyToken;
        if (messageType === 'text') {
          const replyMessage = this.appService.templateMessageReply(
            'buttons',
            '請選擇',
            {
              text: '請選擇一個選項',
              title: '選單',
              thumbnailImageUrl: 'https://example.com/image.jpg',
              actions: [
                { type: 'message', label: '選項 1', text: '你選擇了 1' },
                { type: 'message', label: '選項 2', text: '你選擇了 2' },
              ],
            },
          );

          try {
            // 使用 replyToken 回覆訊息
            const response = await this.lineClient.replyMessage({
              replyToken,
              messages: [replyMessage],
            });
            console.log('回應成功', response);
          } catch (error) {
            console.error('回應失敗', error);
          }
        }
      }
    };

    await handler(events[0]);
    res.status(HttpStatus.OK).send('OK');
  }
}
