import { TemplateColumn } from '@line/bot-sdk';

export type TemplateCarouselReq = {
  altText: string;
  columns: TemplateColumn[];
};
