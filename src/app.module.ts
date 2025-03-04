import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { MessageService } from 'service/message/message.service';
import { WebHookModule } from 'module/webhook/webhook.module';

@Module({
  imports: [GlobalModule, WebHookModule],
  controllers: [],
  providers: [MessageService],
})
export class AppModule {}
