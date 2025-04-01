import { Test, TestingModule } from '@nestjs/testing';
import { ReservesService } from './reserves.service';

describe('ReservesService', () => {
  let service: ReservesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservesService],
    }).compile();

    service = module.get<ReservesService>(ReservesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
