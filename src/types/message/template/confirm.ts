import { Action } from '@line/bot-sdk';

export type TemplateConfirmReq = {
  altText: string;
  text: string;
  actions: Action[];
};
