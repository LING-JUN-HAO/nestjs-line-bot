import { TemplateImageColumn } from '@line/bot-sdk';

export type TemplateImageCarouselReq = {
  altText: string;
  columns: TemplateImageColumn[];
};
