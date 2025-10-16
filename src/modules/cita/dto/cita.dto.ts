import { IsDateString, IsIn, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";

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

    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en formato AAAA-MM-DD' })
    @IsNotEmpty()
    fecha_cita!:string;

    @Matches(/^([01]\d|2[0-3]):00$/, { message: 'La hora de inicio debe estar en formato HH:MM:SS' })
    @IsNotEmpty()
    hora_inicio!:string;

}