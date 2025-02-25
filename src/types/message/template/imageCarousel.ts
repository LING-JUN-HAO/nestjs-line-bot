import { TemplateColumn } from '@line/bot-sdk';

export type TemplateImageCarouselReq = {
  altText: string;
  columns: TemplateColumn[];
};
