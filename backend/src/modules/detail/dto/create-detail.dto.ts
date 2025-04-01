import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateDetailDto {

    @IsString({ message: "La id de la reserva debe ser un string" })
    @IsNotEmpty({ message: "Id no puede estar vacia" })
    reserveId: string = "";
    
    @IsString({ message: "Diagnostico debe ser una cadena de texto" })
    @Length(2, 35, {
        message: "Dianostico debe tener entre 2 y 35 caracteres.",
    })
    @IsNotEmpty({ message: "Diagnostico no puede estar vacío." })
    diagnostico: string = "";

}

