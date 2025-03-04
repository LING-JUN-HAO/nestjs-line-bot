import { messagingApi } from '@line/bot-sdk';

export type ImageMapMessageReq = {
  baseUrl: string;
  altText: string;
  baseSize: messagingApi.ImagemapBaseSize;
  actions: messagingApi.ImagemapAction[];
};
