import { Test, TestingModule } from '@nestjs/testing';
import { DetailController } from './detail.controller';
import { DetailService } from './detail.service';

describe('DetailController', () => {
  let controller: DetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailController],
      providers: [DetailService],
    }).compile();

    controller = module.get<DetailController>(DetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
