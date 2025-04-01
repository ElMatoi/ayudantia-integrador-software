import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsName } from "src/decorators/name-validator.decorator";
import { IsRut } from "../../../decorators/rut-validator.decorator";

export class CreateUserDto {
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @IsName({ message: "El nombre no es válido." })
  @Length(2, 35, {
    message: "El nombre debe tener entre 2 y 35 caracteres.",
  })
  @IsNotEmpty({ message: "El nombre no puede estar vacío." })
  name: string = "";
  
  @IsString({ message: "El RUT debe ser una cadena de texto." })
  @IsRut({ message: "El RUT no es válido." })
  @IsNotEmpty({ message: "El RUT no puede estar vacío." })
  rut: string = "";
}
