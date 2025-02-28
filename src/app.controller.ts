import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { lineConfig } from './config/line.config';
import * as line from '@line/bot-sdk';
import { Request, Response } from 'express';
import { TemplateImageCarouselReq } from './type/message-req';
import { LineEventHandlerService } from './line-event-handler/line-event-handler.service';

@Controller('webhook')
export class AppController {
  constructor(
    private appService: AppService,
    private lineEventHandlerService: LineEventHandlerService,
  ) {}

  lineClient = new line.messagingApi.MessagingApiClient({
    channelAccessToken: lineConfig.channelAccessToken,
  });

  @Post('')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const events = req.body.events;
    this.lineEventHandlerService.handler(events);

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
            altText: 'TemplateImageConfirmReq',
            columns: [
              {
                imageUrl:
                  'https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg',
                action: {
                  label: '選項1-1',
                  type: 'message',
                  text: '選項1-1',
                },
              },
              {
                imageUrl:
                  'https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg',
                action: {
                  label: '選項1-2',
                  type: 'message',
                  text: '選項1-2',
                },
              },
            ],
          };
          const replyMessage =
            this.appService.templateImageCarouselMessageReply(messageParams);

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
