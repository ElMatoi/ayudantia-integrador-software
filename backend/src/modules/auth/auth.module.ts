import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getEnvValue } from 'src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtStrategy } from 'src/guards/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: getEnvValue('JWT_SECRET'),
      signOptions: {
        expiresIn: getEnvValue('JWT_EXP'),
        algorithm: getEnvValue('JWT_ALG'),
      },
    }),
    TypeOrmModule.forFeature([User]),
    
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}