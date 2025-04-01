import { ApiResponse } from 'src/interface/ApiResponse';
import { HttpException,HttpStatus  } from '@nestjs/common';
import { CreateResponse } from 'src/utils/api-response.util.ts';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  async createUser(data: { name: string, rut: string }): Promise<User> {
    const newUser = new User();
    newUser.name = data.name;
    newUser.rut = data.rut;
    return await this.userRepository.save(newUser);
  }

  
  async getAllUsers(): Promise<ApiResponse<User[] | null>> {
    const users = await this.userRepository.find();

    if (!users.length) {
      throw new HttpException(
        CreateResponse('No hay usuarios registrados', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return CreateResponse('Usuarios obtenidos correctamente', users, 'OK');
  }

  
  async dataUserByRut(rut: string): Promise<ApiResponse<User | null>> {
    const user = await this.userRepository.findOne({ where: { rut } });

    if (!user) {
      throw new HttpException(
        CreateResponse('No hay usuarios registrados', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return CreateResponse('Usuario encontrado', user, 'OK');
  }

 
  async getUserByRut(rut: string): Promise<User | null>{
    const user = await this.userRepository.findOne({ where: { rut } });

    if (!user) {
      throw new HttpException(
        { message: 'No hay usuario registrado', error: 'NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}

