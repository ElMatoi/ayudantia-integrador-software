import { Test, TestingModule } from '@nestjs/testing';
import { ReservesController } from './reserves.controller';
import { ReservesService } from './reserves.service';

describe('ReservesController', () => {
  let controller: ReservesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservesController],
      providers: [ReservesService],
    }).compile();

    controller = module.get<ReservesController>(ReservesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
