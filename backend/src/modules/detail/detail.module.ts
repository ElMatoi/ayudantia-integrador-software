import { Module, forwardRef } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { Detail } from './entities/detail.entity';
import { ReserveModule } from '../reserves/reserves.module';
import { Reserve } from '../reserves/entities/reserve.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Detail,Reserve]),
  forwardRef(()=>ReserveModule)], 

  providers: [DetailService],
  controllers: [DetailController],
  exports: [DetailService], 
})
export class DetailModule {}
