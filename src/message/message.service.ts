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
} from '@line/bot-sdk';
import { MessageType, TemplateType } from 'type/enum/message-type';
import {
  TextMessageReq,
  StickerMessageReq,
  ImageMessageReq,
  VideoMessageReq,
  AudioMessageReq,
  LocationMessageReq,
  ImageMapMessageReq,
  TemplateButtonReq,
  TemplateConfirmReq,
  TemplateCarouselReq,
  TemplateImageCarouselReq,
} from 'type/message-req';

@Injectable()
export class MessageService {
  /**
   * 發送文字訊息
   * 詳細的 Emoji 可以使用的 ID 可以參照：@link(https://developers.line.biz/en/docs/messaging-api/emoji-list/#line-emoji-definitions)
   * @see(https://developers.line.biz/en/reference/messaging-api/#text-message)
   */
  textMessageReply(textMessageReq: TextMessageReq): TextMessage {
    const { text, emoji } = textMessageReq;
    let modifiedText = text;
    if (emoji) {
      const textArr = Array.from(text.padStart(emoji[0].index, '~'));
      textArr.splice(emoji[0].index, 0, '$');
      modifiedText = textArr.join('');
    }
    const replyMessage: TextMessage = {
      type: MessageType.Text,
      text: modifiedText,
      ...(emoji && {
        emojis: [
          {
            index: emoji[0].index,
            productId: emoji[0].productId,
            emojiId: emoji[0].emojiId,
          },
        ],
      }),
    };
    return replyMessage;
  }

  /**
   * 發送貼圖訊息
   *
   * 詳細的貼文可以使用的 ID 可以參照：@link(https://developers.line.biz/en/docs/messaging-api/sticker-list/#sticker-definitions)
   * @see(https://developers.line.biz/en/reference/messaging-api/#sticker-message)
   */
  stickerMessageReply(stickerMessageReq: StickerMessageReq): StickerMessage {
    const { packageId, stickerId } = stickerMessageReq;
    const replyMessage: StickerMessage = {
      type: MessageType.Sticker,
      packageId,
      stickerId,
    };
    console.log('replyMessage', replyMessage);
    return replyMessage;
  }

  /**
   * 發送圖片訊息
   *
   * https://i.ytimg.com/vi/RkQy3NlG1eo/hqdefault.jpg?s%E2%80%A6AIYBjgBQAE=&rs=AOn4CLDFHmOQWYoRY4jFLVhRd3MBfW20xA(圖片範例)
   * @see(https://developers.line.biz/en/reference/messaging-api/#image-message)
   */
  imageMessageReply(imageMessageReq: ImageMessageReq): ImageMessage {
    const { originalContentUrl, previewImageUrl } = imageMessageReq;
    const replyMessage: ImageMessage = {
      type: MessageType.Image,
      originalContentUrl,
      previewImageUrl,
    };
    console.log('replyMessage', replyMessage);
    return replyMessage;
  }

  /**
   * 發送影片訊息
   *
   * https://video-previews.elements.envatousercontent.com/h264-video-previews/defb8e5c-0743-44d6-9ee5-1f86815b1037/47548052.mp4(範例使用)
   */
  videoMessageReply(videoMessageReq: VideoMessageReq): VideoMessage {
    const { originalContentUrl, previewImageUrl } = videoMessageReq;
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
  audioMessageReply(audioMessageReq: AudioMessageReq): AudioMessage {
    const { originalContentUrl, duration } = audioMessageReq;
    const replyMessage: AudioMessage = {
      type: MessageType.Audio,
      originalContentUrl,
      duration:
        Math.abs(duration * 1000) === 0 ? 1000 : Math.abs(duration * 1000),
    };
    console.log('audioMessageReply', replyMessage);
    return replyMessage;
  }

  /**
   * 發送地址資訊
   */
  locationMessageReply(
    locationMessageReq: LocationMessageReq,
  ): LocationMessage {
    const { title, address, latitude, longitude } = locationMessageReq;
    const minLatitude = -90;
    const maxLatitude = 90;
    const minLongitude = -180;
    const maxLongitude = 180;
    const replyMessage: LocationMessage = {
      type: MessageType.Location,
      title,
      address,
      latitude: Math.max(Math.min(latitude, maxLatitude), minLatitude),
      longitude: Math.max(Math.min(longitude, maxLongitude), minLongitude),
    };
    console.log('replyMessage', replyMessage);
    return replyMessage;
  }

  /**
   * 發送圖像映射訊息
   *
   * https://super-base-f61a.qd513020.workers.dev/
   */
  imageMapMessageReply(
    imageMapMessageReq: ImageMapMessageReq,
  ): ImageMapMessage {
    const { baseUrl, altText, baseSize, actions } = imageMapMessageReq;
    const replyMessage: ImageMapMessage = {
      type: MessageType.ImageMap,
      baseUrl,
      altText,
      baseSize,
      actions,
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - button
   *
   * https://i.ytimg.com/vi/1vvyyhteIv4/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBTVFOTXnEGbTx4PnmsZTF5IiOOwg(保留使用圖片)
   */
  templateButtonMessageReply(
    templateButtonReq: TemplateButtonReq,
  ): TemplateMessage {
    const { altText, title, text, thumbnailImageUrl, actions } =
      templateButtonReq;
    const replyMessage: TemplateMessage = {
      type: MessageType.Template,
      altText,
      template: {
        type: TemplateType.Button,
        title,
        text,
        ...(thumbnailImageUrl ? { thumbnailImageUrl } : {}),
        actions: actions.slice(0, 4),
      },
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - confirm
   */
  templateConfirmMessageReply(
    templateConfirmReq: TemplateConfirmReq,
  ): TemplateMessage {
    const { altText, text, actions } = templateConfirmReq;
    const replyMessage: TemplateMessage = {
      type: MessageType.Template,
      altText,
      template: {
        type: TemplateType.Confirm,
        text,
        actions: actions.slice(0, 2),
      },
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - carousels
   */
  templateCarouselMessageReply(
    templateImageCarouselReq: TemplateCarouselReq,
  ): TemplateMessage {
    const { altText, columns } = templateImageCarouselReq;
    const replyMessage: TemplateMessage = {
      type: MessageType.Template,
      altText,
      template: {
        type: TemplateType.Carousel,
        columns,
      },
    };
    return replyMessage;
  }

  /**
   *  模板訊息 - imageCarousel
   */
  templateImageCarouselMessageReply(
    templateImageConfirmReq: TemplateImageCarouselReq,
  ): TemplateMessage {
    const { altText, columns } = templateImageConfirmReq;
    const replyMessage: TemplateMessage = {
      type: MessageType.Template,
      altText,
      template: {
        type: TemplateType.ImageCarousel,
        columns,
      },
    };
    return replyMessage;
  }
}
