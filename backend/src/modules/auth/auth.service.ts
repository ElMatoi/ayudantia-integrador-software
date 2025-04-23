import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JWTPayload } from 'src/utils/jwt';
import { getEnvValue } from 'src/config/config.service';
import { AccessTokenResponse } from 'src/utils/auth';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ApiResponse } from 'src/interface/ApiResponse';
import { CreateResponse } from 'src/utils/api-response.util';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: { name: string; rut: string; password: string }): Promise<ApiResponse<AccessTokenResponse>> {
    const existingUser = await this.userService.getUserByRut(data.rut);
    
    if (existingUser !== null) {
      throw new HttpException(
        CreateResponse('Existe un usuario registrado en el sistema', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    const hashPassword = await bcryptjs.hash(data.password, 10);
    const user = await this.userService.createUser({
      name: data.name,
      rut: data.rut,
      password: hashPassword,
    });
     const jwtPayload: JWTPayload={
      id:user.rut,
      rut: user.rut
     }
     const accessToken = await this.generateAccessToken(jwtPayload)

   
    
     return CreateResponse<AccessTokenResponse>(
      'Registro exitoso',
      {accessToken},
      'OK'
    )
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<AccessTokenResponse>> {
    const { rut, password } = loginDto;
    const user = await this.userService.getUserByRut(rut);

    if (!user) {
      throw new HttpException(
        CreateResponse('No hay usuarios registrados con ese RUT', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    const pass= await bcryptjs.compare(password, user.password);
    if (!pass) {
      throw new HttpException(
        CreateResponse('Password no son identicas', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    const jwtPayload: JWTPayload={
      id:user.rut,
      rut: user.rut
     }
     const accessToken = await this.generateAccessToken(jwtPayload)
     
    return CreateResponse<AccessTokenResponse>(
      'Login exitoso',
      {accessToken},
      'OK'
    )




    
  }

  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async validateAccessToken(accessToken: string): Promise<JWTPayload> {
    try {
      return this.jwtService.verify<JWTPayload>(accessToken, {
        secret: getEnvValue('JWT_SECRET'),
      });
    } catch (error) {
      return this.ThrowInvalidAccessTokenError();
    }
  }



ThrowInvalidAccessTokenError(): never {
  const response = CreateResponse(
    'Token invalido',
    null,
    'UNAUTHORIZED',
    'Unauthorized',
    false,
  );
  throw new UnauthorizedException(response);
}

}
