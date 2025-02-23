import { Injectable } from '@nestjs/common';
import {
  TextMessage,
  StickerMessage,
  ImageMessage,
  TemplateMessage,
  VideoMessage,
  AudioMessage,
  LocationMessage,
  ImageMapMessage,
  ImageMapAction,
  Size,
  Action,
  TemplateColumn,
  TemplateImageColumn,
} from '@line/bot-sdk';
import { MessageType } from './types/enum/messageType';
import { StickerMap } from './types/stickers';
import { TemplateType, TemplateMap } from './types/templateMessage';

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
   * 發送圖片訊息
   *
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

  /**
   * 發送影片訊息
   *
   * https://video-previews.elements.envatousercontent.com/h264-video-previews/defb8e5c-0743-44d6-9ee5-1f86815b1037/47548052.mp4(範例使用)
   */
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

  /**
   * 發送語音訊息
   *
   * https://res.cloudinary.com/dseg0uwc9/video/upload/v1740070405/%E9%90%B5%E4%BA%BA%E8%B3%BD%E8%A6%81%E5%A4%9A%E4%B9%85_pgkjr2.m4a(範例使用)
   */
  audioMessageReply(
    originalContentUrl: string,
    duration: number,
  ): AudioMessage {
    const replyMessage: AudioMessage = {
      type: MessageType.Audio,
      originalContentUrl,
      duration,
    };
    return replyMessage;
  }

  /**
   * 發送地址資訊
   */
  locationMessageReply(
    title: string,
    address: string,
    latitude: number,
    longitude: number,
  ): LocationMessage {
    const replyMessage: LocationMessage = {
      type: MessageType.Location,
      title,
      address,
      latitude,
      longitude,
    };
    return replyMessage;
  }

  /**
   * 發送圖像映射訊息
   *
   * https://super-base-f61a.qd513020.workers.dev/
   */
  imageMapMessageReply(
    baseUrl: string,
    altText: string,
    baseSize: Size,
    actions: ImageMapAction[],
  ): ImageMapMessage {
    const replyMessage: ImageMapMessage = {
      type: MessageType.Imagemap,
      baseUrl,
      altText,
      baseSize,
      actions,
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - buttons
   *
   * https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg(保留使用圖片)
   */
  templateButtonMessageReply(
    altText: string,
    text: string,
    actions: Action[],
    title?: string,
    thumbnailImageUrl?: string,
  ): TemplateMessage {
    const replyMessage: TemplateMessage = {
      type: 'template',
      altText,
      template: {
        type: 'buttons',
        title,
        text,
        ...(thumbnailImageUrl ? { thumbnailImageUrl } : {}),
        actions,
      },
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - confirms
   */
  templateConfirmMessageReply(
    altText: string,
    text: string,
    actions: Action[],
  ): TemplateMessage {
    const replyMessage: TemplateMessage = {
      type: 'template',
      altText,
      template: {
        type: 'confirm',
        text,
        actions,
      },
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - carousels
   */
  templateCarouselMessageReply(
    altText: string,
    columns: TemplateColumn[],
  ): TemplateMessage {
    const replyMessage: TemplateMessage = {
      type: 'template',
      altText,
      template: {
        type: 'carousel',
        columns,
      },
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - imageCarousels
   */
  templateImageCarouselMessageReply(
    altText: string,
    columns: TemplateImageColumn[],
  ): TemplateMessage {
    const replyMessage: TemplateMessage = {
      type: 'template',
      altText,
      template: {
        type: 'image_carousel',
        columns,
      },
    };
    return replyMessage;
  }

  templateMessageReply<T extends TemplateType>(
    templateType: T,
    altText: string,
    options: {
      text?: string;
      actions?: Action[];
      title?: string;
      thumbnailImageUrl?: string;
      columns?: TemplateColumn[] | TemplateImageColumn[];
    },
  ): TemplateMessage {
    const { text, actions, title, thumbnailImageUrl, columns } = options;

    // 使用型別斷言確保 content 的型別正確
    let content: TemplateMap[T];

    switch (templateType) {
      case 'buttons':
        if (!actions || actions.length === 0) {
          throw new Error(
            'At least one action is required for buttons template',
          );
        }
        content = {
          type: 'buttons',
          title,
          text: text ?? '預設值',
          thumbnailImageUrl,
          actions,
        } as TemplateMap[T];
        break;

      case 'confirm':
        if (!actions || actions.length === 0) {
          throw new Error('Actions are required for confirm template');
        }
        content = {
          type: 'confirm',
          text,
          actions,
        } as TemplateMap[T];
        break;

      case 'carousel':
        if (!columns || columns.length === 0) {
          throw new Error('Columns are required for carousel template');
        }
        content = {
          type: 'carousel',
          columns: columns as TemplateColumn[],
        } as TemplateMap[T];
        break;

      case 'image_carousel':
        if (!columns || columns.length === 0) {
          throw new Error('Columns are required for image carousel template');
        }
        content = {
          type: 'image_carousel',
          columns: columns as TemplateImageColumn[],
        } as TemplateMap[T];
        break;

      default:
        throw new Error(`Unknown template type: ${templateType}`);
    }

    return {
      type: 'template',
      altText,
      template: content,
    };
  }
}
