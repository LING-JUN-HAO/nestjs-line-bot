import { Injectable } from '@nestjs/common';
import {
  TextMessage,
  StickerMessage,
  ImageMessage,
  TemplateMessage,
  VideoMessage,
} from '@line/bot-sdk';
import { MessageType } from './types/enum/messageType';
import { StickerMap } from './types/stickers';

@Injectable()
export class AppService {
  // TODO 後續把 Emoji 變成清單維護
  /**
   * 發送文字訊息
   * 詳細的 Emoji 可以使用的 ID 可以參照：@link(https://developers.line.biz/en/docs/messaging-api/emoji-list/#line-emoji-definitions)
   * @see(https://developers.line.biz/en/reference/messaging-api/#text-message)
   */
  textMessageReply(text: string): TextMessage {
    const replyMessage: TextMessage = {
      type: MessageType.Text,
      text,
      // emojis: [
      //   {
      //     index: 0,
      //     productId: '670e0cce840a8236ddd4ee4c',
      //     emojiId: '001',
      //   },
      //   {
      //     index: 2,
      //     productId: '670e0cce840a8236ddd4ee4c',
      //     emojiId: '002',
      //   },
      // ],
    };
    return replyMessage;
  }

  // TODO 後續把 projectId 跟 stickerId 變成清單維護
  /**
   * 發送貼圖訊息
   *
   * 詳細的貼文可以使用的 ID 可以參照：@link(https://developers.line.biz/en/docs/messaging-api/sticker-list/#sticker-definitions)
   * @see(https://developers.line.biz/en/reference/messaging-api/#sticker-message)
   */
  stickerMessageReply<
    T extends keyof StickerMap,
    U extends StickerMap[T][number],
  >(packageId: T, stickerId: U): StickerMessage {
    const replyMessage: StickerMessage = {
      type: MessageType.Sticker,
      packageId: packageId,
      stickerId: stickerId,
    };
    return replyMessage;
  }

  /**
   * 發送圖片訊息(類型限制：JPEG or PNG，Max size：10 MB)
   * @see(https://developers.line.biz/en/reference/messaging-api/#image-message)
   */
  imageMessageReply(
    originalContentUrl: string,
    previewImageUrl: string,
  ): ImageMessage {
    const replyMessage: ImageMessage = {
      type: MessageType.Image,
      originalContentUrl,
      previewImageUrl,
    };
    return replyMessage;
  }

  videoMessageReply(
    originalContentUrl: string,
    previewImageUrl: string,
  ): VideoMessage {
    const replyMessage: VideoMessage = {
      type: MessageType.Video,
      originalContentUrl,
      previewImageUrl,
    };
    return replyMessage;
  }

  templateButtonMessageReply(title: string, text: string): TemplateMessage {
    const replyMessage: TemplateMessage = {
      type: 'template',
      altText: `請選擇一個選項`,
      template: {
        type: 'buttons',
        title: title,
        text: text,
        thumbnailImageUrl:
          'https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg',
        imageAspectRatio: 'rectangle',
        imageSize: 'cover',
        actions: [
          {
            type: 'message',
            label: '選項 1',
            text: '你選擇了 選項 1',
          },
          {
            type: 'message',
            label: '選項 2',
            text: '你選擇了 選項 2',
          },
          {
            type: 'message',
            label: '選項 3',
            text: '你選擇了 選項 3',
          },
          {
            type: 'message',
            label: '選項 4',
            text: '你選擇了 選項 4',
          },
        ],
      },
    };
    return replyMessage;
  }
}
