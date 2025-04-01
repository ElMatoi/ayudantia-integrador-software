import { Module,forwardRef } from '@nestjs/common';
import { ReservesController } from './reserves.controller';
import { ReserveService } from './reserves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Detail } from '../detail/entities/detail.entity';
import { DetailModule } from '../detail/detail.module';
@Module({
  imports: [TypeOrmModule.forFeature([Reserve,User, Detail]),
  forwardRef(()=>UserModule), 
  forwardRef(()=>DetailModule)], 

  providers: [ReserveService],
  controllers: [ReservesController],
  exports: [ReserveService], 
})
export class ReserveModule {}