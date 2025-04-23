import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiResponse } from 'src/interface/ApiResponse';
import { AccessTokenResponse } from 'src/utils/auth';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("registerUser")
    create(@Body() createUseDto: CreateUserDto): Promise<ApiResponse<AccessTokenResponse>> {
      return this.authService.createUser(createUseDto);
    }
    
    @Post("login")
    login(@Body() loginDto: LoginDto): Promise<ApiResponse<AccessTokenResponse>> {
      return this.authService.login(loginDto);
    }

    
 
}

