import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmeplateMessageService } from './tmeplate-message/tmeplate-message.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TmeplateMessageService],
})
export class AppModule {}
