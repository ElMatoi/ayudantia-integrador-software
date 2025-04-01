import { Injectable,forwardRef,Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserve } from './entities/reserve.entity';
import { UserService } from '../user/user.service';
import { HttpStatus,HttpException } from '@nestjs/common';
import { ApiResponse } from 'src/interface/ApiResponse';
import { CreateResponse } from 'src/utils/api-response.util.ts';


@Injectable()
export class ReserveService {
    constructor (
      @InjectRepository(Reserve)
      private reserveRepository : Repository<Reserve>,
      @Inject(forwardRef(() => UserService)) 
      private userService: UserService,
    ){}

async createReserve(data: {rutUser : string , description : string}):Promise <Reserve>{
  const user = await this.userService.getUserByRut(data.rutUser);
  if (!user) {
    throw new HttpException(
      CreateResponse('Usuario no encontrado', null, 'NOT_FOUND'),
      HttpStatus.NOT_FOUND,
    );
  }
  const newReserve=  new Reserve()
  newReserve.description=data.description;
  newReserve.user=user;
  return await this.reserveRepository.save(newReserve);

}

async getReservesByUser(rut: string): Promise<ApiResponse<any>> {
  const user = await this.userService.getUserByRut(rut);

  if (!user) {
    return CreateResponse('Usuario no encontrado', null, 'NOT_FOUND');
  }

  const reserves = await this.reserveRepository
    .createQueryBuilder('reserve')
    .select(['reserve.id', 'reserve.description'])  
    .innerJoin('reserve.user', 'user')  
    .where('user.rut = :rut', { rut })
    .getMany();

  if (reserves.length === 0) {
    return CreateResponse('No hay reservas para este usuario', null, 'NOT_FOUND');
  }

  const result = {
    userId: user.id,  
    reserves,  
  };

  return CreateResponse('Reservas obtenidas correctamente', result, 'OK');
}

async getDetailReserve (id: string):Promise <any | null>{
  const reserve = await this.reserveRepository.findOne({where : {id},
  relations: ['detail']});

  if (!reserve) {
    throw new HttpException(
      CreateResponse('Reserva no encontrado', null, 'NOT_FOUND'),
      HttpStatus.NOT_FOUND,
    );
  }
  return CreateResponse('Detalle obtenido correctamente', reserve.detail, 'OK');
}

async getReserveById ( id:string): Promise <Reserve | null>{
  const reserve = await this.reserveRepository.findOne({where : {id}})
  if(!reserve){
    throw new HttpException(
      { message: 'No existe la reserva en el sistema', error: 'NOT_FOUND' },
      HttpStatus.NOT_FOUND,
    );
  }
  return reserve;
}
async updateReserveDetail(reserve: Reserve): Promise<Reserve> {
  
  return await this.reserveRepository.save(reserve);
}










}

 
  
  

