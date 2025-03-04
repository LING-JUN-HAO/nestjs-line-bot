import { messagingApi } from '@line/bot-sdk';

export type TemplateImageCarouselReq = {
  altText: string;
  columns: messagingApi.ImageCarouselColumn[];
};
