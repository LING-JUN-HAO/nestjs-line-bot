import { messagingApi } from '@line/bot-sdk';
import { MessageType, TemplateType } from 'type/enum/message-type';
import {
  TextMessageReq,
  StickerMessageReq,
  ImageMessageReq,
  VideoMessageReq,
  AudioMessageReq,
  LocationMessageReq,
  ImageMapMessageReq,
  FlexMessageReq,
  TemplateButtonReq,
  TemplateConfirmReq,
  TemplateCarouselReq,
  TemplateImageCarouselReq,
} from 'type/message-req';

export class MessageService {
  /**
   * 發送文字訊息
   * 詳細的 Emoji 可以使用的 ID 可以參照：@link(https://developers.line.biz/en/docs/messaging-api/emoji-list/#line-emoji-definitions)
   * @see(https://developers.line.biz/en/reference/messaging-api/#text-message)
   */
  textMessageReply(textMessageReq: TextMessageReq): messagingApi.TextMessage {
    const { text, emoji, quickReplyItems } = textMessageReq;
    let modifiedText = text;
    let modifiedQuicklyItems: messagingApi.QuickReplyItem[] | undefined =
      undefined;
    if (emoji) {
      const textArr = Array.from(text.padStart(emoji[0].index, '~'));
      textArr.splice(emoji[0].index, 0, '$');
      modifiedText = textArr.join('');
    }
    if (quickReplyItems) {
      modifiedQuicklyItems = quickReplyItems.map((quickReplyItem) => ({
        type: 'action' as const,
        action: quickReplyItem.action,
        ...(quickReplyItem.imageUrl && {
          imageUrl: quickReplyItem.imageUrl,
        }),
      }));
    }
    const replyMessage: messagingApi.TextMessage = {
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
      ...(modifiedQuicklyItems && {
        quickReply: { items: modifiedQuicklyItems },
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
  stickerMessageReply(
    stickerMessageReq: StickerMessageReq,
  ): messagingApi.StickerMessage {
    const { packageId, stickerId } = stickerMessageReq;
    const replyMessage: messagingApi.StickerMessage = {
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
  imageMessageReply(
    imageMessageReq: ImageMessageReq,
  ): messagingApi.ImageMessage {
    const { originalContentUrl, previewImageUrl } = imageMessageReq;
    const replyMessage: messagingApi.ImageMessage = {
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
  videoMessageReply(
    videoMessageReq: VideoMessageReq,
  ): messagingApi.VideoMessage {
    const { originalContentUrl, previewImageUrl } = videoMessageReq;
    const replyMessage: messagingApi.VideoMessage = {
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
    audioMessageReq: AudioMessageReq,
  ): messagingApi.AudioMessage {
    const { originalContentUrl, duration } = audioMessageReq;
    const replyMessage: messagingApi.AudioMessage = {
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
  ): messagingApi.LocationMessage {
    const { title, address, latitude, longitude } = locationMessageReq;
    const minLatitude = -90;
    const maxLatitude = 90;
    const minLongitude = -180;
    const maxLongitude = 180;
    const replyMessage: messagingApi.LocationMessage = {
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
  ): messagingApi.ImagemapMessage {
    const { baseUrl, altText, baseSize, actions } = imageMapMessageReq;
    const replyMessage: messagingApi.ImagemapMessage = {
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
  ): messagingApi.TemplateMessage {
    const { altText, title, text, thumbnailImageUrl, actions } =
      templateButtonReq;
    const replyMessage: messagingApi.TemplateMessage = {
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
  ): messagingApi.TemplateMessage {
    const { altText, text, actions } = templateConfirmReq;
    const replyMessage: messagingApi.TemplateMessage = {
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
  ): messagingApi.TemplateMessage {
    const { altText, columns } = templateImageCarouselReq;
    const replyMessage: messagingApi.TemplateMessage = {
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
  ): messagingApi.TemplateMessage {
    const { altText, columns } = templateImageConfirmReq;
    const replyMessage: messagingApi.TemplateMessage = {
      type: MessageType.Template,
      altText,
      template: {
        type: TemplateType.ImageCarousel,
        columns,
      },
    };
    return replyMessage;
  }

  FlexMessageReply(flexMessageReq: FlexMessageReq): messagingApi.FlexMessage {
    const { flexContent } = flexMessageReq;
    const replyMessage: messagingApi.FlexMessage = {
      type: MessageType.Flex,
      altText: 'Flex Message',
      contents: flexContent,
    };
    return replyMessage;
  }
}
