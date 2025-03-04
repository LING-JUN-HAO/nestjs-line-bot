import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { MessageService } from 'service/message/message.service';
import { WebHookModule } from 'module/webhook/webhook.module';
import { LineMiddleware } from './line.middleware';

@Module({
  imports: [GlobalModule, WebHookModule],
  controllers: [],
  providers: [MessageService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LineMiddleware).forRoutes('/webhook');
  }
}
