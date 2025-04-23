import { Module } from '@nestjs/common';
import { getEnvValue } from './config/config.service';
import { TypeOrmModule
} from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
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
      entities: [User], 
    }),
    UserModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
