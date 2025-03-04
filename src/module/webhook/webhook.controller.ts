import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { lineConfig } from 'config/line.config';
import { Request, Response } from 'express';
import { LineEventHandlerService } from 'module/webhook/line-event-handler/line-event-handler.service';

@Controller('webhook')
export class WebhookController {
  constructor(private lineEventHandlerService: LineEventHandlerService) {}

  lineClient = new line.messagingApi.MessagingApiClient({
    channelAccessToken: lineConfig.channelAccessToken,
  });

  @Post('')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const events = req.body.events;
    /**
     * events 是空的，代表 webhook 串接的心跳測試
     */
    if (Array.isArray(events) && events.length === 0) {
      res.status(HttpStatus.OK).send('OK');
    }

    /**
     * 處理 webhook 傳送過來的事件
     */
    await Promise.all(
      events.map((event) => this.lineEventHandlerService.handler(event)),
    );
    res.status(HttpStatus.OK).send('OK');
  }
}
