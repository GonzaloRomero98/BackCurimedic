import { IsDateString, IsIn, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CitaDto{
    @IsString()
    @Length(9,15)
    @IsNotEmpty()
    rut_medico!:string

    @IsString()
    @Length(9,15)
    @IsNotEmpty()
    rut_paciente!:string

    @IsInt()
    servicio_id:number;

    @IsDateString()
    @IsNotEmpty()
    hora_inicio!:string

    @IsDateString()
    @IsNotEmpty()
    hora_final!:string


}