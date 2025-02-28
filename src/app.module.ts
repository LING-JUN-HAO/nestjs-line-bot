import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageService } from './message/message.service';
import { LineEventHandlerService } from './line-event-handler/line-event-handler.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MessageService, LineEventHandlerService],
})
export class AppModule {}
