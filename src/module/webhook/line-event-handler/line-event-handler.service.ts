import { Injectable } from '@nestjs/common';
import { MessageService } from 'service/message/message.service'; // 修正 import 路徑
import * as line from '@line/bot-sdk';
import { lineConfig } from 'config/line.config'; // 修正 import 路徑

@Injectable()
export class LineEventHandlerService {
  constructor(private messageService: MessageService) {}

  private lineClient = new line.messagingApi.MessagingApiClient({
    channelAccessToken: lineConfig.channelAccessToken,
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
      // const replyMessage = this.messageService.textMessageReply({
      //   text: `時間戳：${timestamp}\n事件 ID：${webhookEventId}\n事件類型：${source.type}\n用戶 ID：${source.userId}\n訊息編號：${message.id}\n訊息類型：${message.type}\n訊息本體：${JSON.stringify(message)}`,
      // });
      const replyMessage = this.messageService.FlexMessageReply({
        flexContent: {
          type: 'bubble',
          header: {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: 'Test1',
                align: 'center',
              },
              {
                type: 'text',
                text: 'Test2',
                align: 'center',
              },
            ],
            backgroundColor: '#84D2F6',
            justifyContent: 'center',
          },
          hero: {
            type: 'image',
            url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover',
            action: {
              type: 'uri',
              uri: 'https://line.me/',
            },
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Brown Cafe',
                weight: 'bold',
                size: 'xl',
              },
              {
                type: 'box',
                layout: 'baseline',
                margin: 'md',
                contents: [
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png',
                  },
                  {
                    type: 'icon',
                    size: 'sm',
                    url: 'https://developers-resource.landpress.line.me/fx/img/review_gray_star_28.png',
                  },
                  {
                    type: 'text',
                    text: '4.0',
                    size: 'sm',
                    color: '#999999',
                    margin: 'md',
                    flex: 0,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Place',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: 'Flex Tower, 7-7-4 Midori-ku, Tokyo',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Time',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: '10:00 - 23:00',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'CALL',
                  uri: 'https://line.me/',
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'WEBSITE',
                  uri: 'https://line.me/',
                },
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [],
                margin: 'sm',
              },
            ],
            flex: 0,
          },
        },
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
