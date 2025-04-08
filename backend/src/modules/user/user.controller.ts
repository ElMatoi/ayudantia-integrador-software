import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/interface/ApiResponse';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("createUser")
    create(@Body() createUserDto: CreateUserDto) {
    const {name, rut} = createUserDto
    return this.userService.createUser({name, rut})
  }
  @Get("user/:rut") 
    getUser(@Param("rut") rut: string):Promise<ApiResponse<any>> {
    return this.userService.dataUserByRut(rut);
}
  @Get("all-users")
    getAllUsers():Promise <ApiResponse<any>>{
      return this.userService.getAllUsers();

    }
  }
