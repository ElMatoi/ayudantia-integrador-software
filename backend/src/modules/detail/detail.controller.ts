import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailService } from './detail.service';
import { CreateDetailDto } from './dto/create-detail.dto';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Post("createDetail")
  create(@Body() createDetailDto: CreateDetailDto) {
    const { diagnostico, reserveId} = createDetailDto
    return this.detailService.createDetail({diagnostico,reserveId})
  }

 
}
