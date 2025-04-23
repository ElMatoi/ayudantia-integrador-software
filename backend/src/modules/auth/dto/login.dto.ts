import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsRut} from "src/decorators/rut-validator.decorator";
import { IsPassword } from "src/decorators/password-validator.decorator";

export class LoginDto {
  @IsString({ message: "El RUT debe ser una cadena de texto." })
  @IsRut({ message: "El RUT no es válido." })
  @IsNotEmpty({ message: "El RUT no puede estar vacío." })
  rut: string = "";

  @IsString({ message: "La contraseña debe ser una cadena de texto." })
  @Length(6, 128, {
    message: "La contraseña debe tener entre 6 y 128 caracteres.",
  })
  @IsPassword({ message: "Password iinvalida" })
  @IsNotEmpty({ message: "La contraseña no puede estar vacía." })
  password: string = "";
}
