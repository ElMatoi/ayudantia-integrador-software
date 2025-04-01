import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsRut } from "src/decorators/rut-validator.decorator";

export class CreateReserveDto {
  @IsString({ message: "La descripcion debe ser una cadena de texto" })
 
  @Length(2, 35, {
    message: "La descripcion debe tener entre 2 y 35 caracteres.",
  })
  @IsNotEmpty({ message: "La decripcion no puede estar vacío." })
  description: string = "";
  
  @IsString({ message: "El RUT debe ser una cadena de texto." })
  @IsRut({ message: "El RUT no es válido." })
  @IsNotEmpty({ message: "El RUT no puede estar vacío." })
  rutUser: string = "";
}

