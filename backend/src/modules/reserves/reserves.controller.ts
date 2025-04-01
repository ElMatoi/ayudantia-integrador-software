import { Controller, Get, Post, Body, Param,} from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { ReserveService } from './reserves.service';
import { ApiResponse } from 'src/interface/ApiResponse';
@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReserveService) {}

  @Post("createReserve")
  create(@Body() createReserveDto: CreateReserveDto) {
   const {description,rutUser} = createReserveDto
   return this.reservesService.createReserve({description,rutUser})
  }

  @Get('reserveUser/:rutUser')
  getReserveUser(@Param("rutUser") rutUser:string):Promise<ApiResponse<any>>{
    return this.reservesService.getReservesByUser(rutUser);

  }
  @Get('reserveDetail/:id')
  getReserveDetail(@Param("id") id:string):Promise<ApiResponse<any>>{
    return this.reservesService.getDetailReserve(id);

  }

}
