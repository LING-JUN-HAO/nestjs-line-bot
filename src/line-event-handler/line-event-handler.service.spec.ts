import { Test, TestingModule } from '@nestjs/testing';
import { LineEventHandlerService } from './line-event-handler.service';

describe('LineEventHandlerService', () => {
  let service: LineEventHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineEventHandlerService],
    }).compile();

    service = module.get<LineEventHandlerService>(LineEventHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
