import { Test, TestingModule } from '@nestjs/testing';
import { PayzeService } from './payze.service';

describe('PayzeService', () => {
  let service: PayzeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayzeService],
    }).compile();

    service = module.get<PayzeService>(PayzeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
