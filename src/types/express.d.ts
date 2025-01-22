import { WebhookRequestBody } from '@line/bot-sdk';

declare module 'express' {
  interface Request {
    body: WebhookRequestBody;
  }
}
