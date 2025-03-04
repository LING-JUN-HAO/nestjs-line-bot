import { messagingApi } from '@line/bot-sdk';

export type TemplateConfirmReq = {
  altText: string;
  text: string;
  actions: messagingApi.Action[];
};
