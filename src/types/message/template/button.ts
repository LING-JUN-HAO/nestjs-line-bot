import { Action } from '@line/bot-sdk';

export type TemplateButtonReq = {
  altText: string;
  text: string;
  actions: Action[];
  title?: string;
  thumbnailImageUrl?: string;
};
