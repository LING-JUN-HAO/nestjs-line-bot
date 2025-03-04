import { Global, Module } from '@nestjs/common';
import { MessageService } from 'service/message/message.service';

@Global()
@Module({
  providers: [MessageService],
  exports: [MessageService],
})
export class GlobalModule {}
