import { messagingApi } from '@line/bot-sdk';

export type TemplateButtonReq = {
  altText: string;
  text: string;
  actions: messagingApi.Action[];
  title?: string;
  thumbnailImageUrl?: string;
};
