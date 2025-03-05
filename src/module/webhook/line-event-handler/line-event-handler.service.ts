import { Inject, Injectable } from '@nestjs/common';
import { MessageService } from 'service/message/message.service';
import * as line from '@line/bot-sdk';
import { LINE_CONFIG } from 'config/line.config';

@Injectable()
export class LineEventHandlerService {
  constructor(
    private messageService: MessageService,
    @Inject(LINE_CONFIG) private readonly lineConfig: line.ClientConfig,
  ) {}

  private lineClient = new line.messagingApi.MessagingApiClient({
    channelAccessToken: this.lineConfig.channelAccessToken,
  });

  async handler(event: line.WebhookEvent): Promise<void> {
    const { type } = event;

    const eventHandler: Record<string, () => Promise<void>> = {
      message: async () => await this.handleMessage(event as line.MessageEvent),
      follow: async () => await this.handleFollow(event as line.FollowEvent),
    };

    if (eventHandler[type]) {
      await eventHandler[type]();
    } else {
      console.warn(`🚨 未知的事件類型: ${type}`);
    }
  }

  /**
   * 處理追蹤事件
   */
  private async handleFollow(event: line.FollowEvent): Promise<void> {
    try {
      const { replyToken } = event;
      if (!replyToken) return;

      const replyMessage = this.messageService.textMessageReply({
        text: '歡迎你加入！',
        emoji: [
          { index: 0, productId: '5ac21a8c040ab15980c9b43f', emojiId: '005' },
        ],
      });

      await this.lineClient.replyMessage({
        replyToken,
        messages: [replyMessage],
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * 處理訊息事件
   */
  private async handleMessage(event: line.MessageEvent): Promise<void> {
    try {
      const { replyToken } = event;
      if (!replyToken) return;
      const { timestamp, source, message, webhookEventId } = event;
      const replyMessage = this.messageService.textMessageReply({
        text: `時間戳：${timestamp}\n事件 ID：${webhookEventId}\n事件類型：${source.type}\n用戶 ID：${source.userId}\n訊息編號：${message.id}\n訊息類型：${message.type}\n訊息本體：${JSON.stringify(message)}`,
      });
      await this.lineClient.replyMessage({
        replyToken,
        messages: [replyMessage],
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
