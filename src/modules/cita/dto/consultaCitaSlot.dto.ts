import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class ConsultarCitaSlotDto{
    @IsString()
    @IsNotEmpty()
    rut_medico!:string;

    @Matches(/^\d{4}-\d{2}-\d{2}$/, {message: 'La fecha debe estar en formato AAAA-MM-DD'})
    fecha_cita!:string;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    hora_inicio?:string;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    hora_fin?: string;
}