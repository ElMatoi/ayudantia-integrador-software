import { Module } from '@nestjs/common';
import { getEnvValue } from './config/config.service';
import { TypeOrmModule
} from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { Reserve } from './modules/reserves/entities/reserve.entity';
import { ReserveModule } from './modules/reserves/reserves.module';
import { DetailModule } from './modules/detail/detail.module';
import { Detail } from './modules/detail/entities/detail.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnvValue('DATABASE_HOST'),
      port: +getEnvValue('DATABASE_PORT'),
      username: getEnvValue('DATABASE_USERNAME'),
      password: getEnvValue('DATABASE_PASSWORD'),
      database: getEnvValue('DATABASE_NAME'),
      synchronize: true,
      entities: [User,Reserve,Detail], 
    }),
    UserModule, 
    ReserveModule,
    DetailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
