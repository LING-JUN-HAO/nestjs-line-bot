import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { lineConfig } from './config/line.config';
import * as line from '@line/bot-sdk';
import { Request, Response } from 'express';
import { TemplateImageCarouselReq } from './types/messageReq';

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
          const messageParams: TemplateImageCarouselReq = {
            altText: 'templateButton',
            columns: [
              {
                text: '測試1',
                thumbnailImageUrl:
                  'https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg',
                actions: [
                  {
                    label: '選項1-1',
                    type: 'message',
                    text: '選項1-1',
                  },
                  {
                    label: '選項1-2',
                    type: 'message',
                    text: '選項1-2',
                  },
                ],
              },
              {
                text: '測試2',
                thumbnailImageUrl:
                  'https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg',
                actions: [
                  {
                    label: '選項2-1',
                    type: 'message',
                    text: '選項2-1',
                  },
                  {
                    label: '選項2-2',
                    type: 'message',
                    text: '選項2-2',
                  },
                ],
              },
            ],
          };
          const replyMessage =
            this.appService.templateCarouselMessageReply(messageParams);

          try {
            // 使用 replyToken 回覆訊息
            const response = await this.lineClient.replyMessage({
              replyToken,
              messages: [replyMessage, replyMessage],
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
