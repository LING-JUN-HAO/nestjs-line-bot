import { Test, TestingModule } from '@nestjs/testing';
import { TmeplateMessageService } from './tmeplate-message.service';

describe('TmeplateMessageService', () => {
  let service: TmeplateMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TmeplateMessageService],
    }).compile();

    service = module.get<TmeplateMessageService>(TmeplateMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
