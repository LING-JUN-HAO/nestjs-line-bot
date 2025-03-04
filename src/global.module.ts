import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineConfigProvider } from 'config/line.config';
import { MessageService } from 'service/message/message.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [MessageService, LineConfigProvider],
  exports: [MessageService, LineConfigProvider],
})
export class GlobalModule {}
