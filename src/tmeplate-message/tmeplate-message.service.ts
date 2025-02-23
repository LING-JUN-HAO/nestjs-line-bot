import {
  Action,
  TemplateMessage,
  TemplateColumn,
  TemplateImageColumn,
} from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TmeplateMessageService {
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

  templateMessageReply(
    type: string
  ) {}
}
