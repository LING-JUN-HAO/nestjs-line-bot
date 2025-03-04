import { Module } from '@nestjs/common';
import { LineEventHandlerService } from 'module/webhook/line-event-handler/line-event-handler.service';
import { WebhookController } from 'module/webhook/webhook.controller';

@Module({
  controllers: [WebhookController],
  providers: [LineEventHandlerService],
})
export class WebHookModule {}
