import { Module,forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from '../reserves/entities/reserve.entity';
import { ReserveModule } from '../reserves/reserves.module';
@Module({
  imports: [TypeOrmModule.forFeature([User,Reserve]),
  forwardRef(()=>ReserveModule)], 
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], 
})
export class UserModule {}
