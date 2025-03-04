import { messagingApi } from '@line/bot-sdk';

export type TemplateCarouselReq = {
  altText: string;
  columns: messagingApi.CarouselColumn[];
};
