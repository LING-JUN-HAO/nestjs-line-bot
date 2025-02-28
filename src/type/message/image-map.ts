import { ImageMapAction, Size } from '@line/bot-sdk';

export type ImageMapMessageReq = {
  baseUrl: string;
  altText: string;
  baseSize: Size;
  actions: ImageMapAction[];
};
