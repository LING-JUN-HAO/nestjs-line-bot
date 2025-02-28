import { Injectable } from '@nestjs/common';
import { MessageService } from 'message/message.service';
import * as line from '@line/bot-sdk';
import { lineConfig } from 'config/line.config';

@Injectable()
export class LineEventHandlerService {
  constructor(private messageService: MessageService) {}

  lineClient = new line.messagingApi.MessagingApiClient({
    channelAccessToken: lineConfig.channelAccessToken,
  });
  handler(event: line.WebhookEvent) {
    const { type } = event;

    console.log('type', type);
  }

  handleFollow(event: line.FollowEvent) {
    const { replyToken } = event;
    const replyMessage = this.messageService.textMessageReply({
      text: '歡迎你加入！',
      emoji: [
        { index: 0, productId: '5ac21a8c040ab15980c9b43f', emojiId: '005' },
      ],
    });
    return this.lineClient.replyMessage({
      replyToken,
      messages: [replyMessage],
    });
  }
}
