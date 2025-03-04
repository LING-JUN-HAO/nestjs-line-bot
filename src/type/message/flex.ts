import { messagingApi } from '@line/bot-sdk';

export type FlexMessageReq = {
  flexContent: messagingApi.FlexContainer;
};
