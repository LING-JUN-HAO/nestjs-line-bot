import { ClientConfig } from '@line/bot-sdk';
import { ConfigService } from '@nestjs/config';

export const LINE_CONFIG = 'LINE_CONFIG';

const lineConfig = (configService: ConfigService): ClientConfig => ({
  channelAccessToken:
    configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN') || '',
  channelSecret: configService.get<string>('LINE_CHANNEL_SECRET') || '',
});

export const LineConfigProvider = {
  provide: LINE_CONFIG,
  useFactory: (configService: ConfigService) => lineConfig(configService),
  inject: [ConfigService],
};
