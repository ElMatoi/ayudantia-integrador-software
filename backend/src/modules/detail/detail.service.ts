import { Injectable,forwardRef, Inject } from '@nestjs/common';
import { Detail } from './entities/detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from '../reserves/entities/reserve.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/interface/ApiResponse';
import { CreateResponse } from 'src/utils/api-response.util.ts';
import { ReserveService } from '../reserves/reserves.service';
import { HttpStatus,HttpException } from '@nestjs/common';
@Injectable()
export class DetailService {
constructor(
    @InjectRepository(Detail)
      private  readonly detailRepository: Repository<Detail>,
    @Inject(forwardRef(() => ReserveService)) 
        private reserveService: ReserveService,
    ) {}
  

    async createDetail(data: { reserveId: string, diagnostico: string }): Promise<Detail> {
      const reserve = await this.reserveService.getReserveById(data.reserveId);
      
      if (!reserve) {
          throw new HttpException(
              CreateResponse('Reserva no encontrada', null, 'NOT_FOUND'),
              HttpStatus.NOT_FOUND,
          );
      }
  
     
      const existingDetail = await this.detailRepository.findOne({
          where: { reserver: { id: data.reserveId } },
      });
  
      if (existingDetail) {
          throw new HttpException(
              CreateResponse('Este detalle ya está asignado a una reserva', null, 'BAD_REQUEST'),
              HttpStatus.BAD_REQUEST,
          );
      }
  
      const newDetail = new Detail();
      newDetail.diagnostico = data.diagnostico;
      newDetail.reserver = reserve;
  
      return await this.detailRepository.save(newDetail);
  }
  
   


}
