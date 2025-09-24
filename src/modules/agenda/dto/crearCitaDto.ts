/*import { IsUUID, IsISO8601, IsOptional, IsEnum, IsString, MaxLength } from "class-validator";

enum tipo_Cita{
    PRESENCIAL = 'PRESENCIAL',
    ONLINE = 'ONLINE'
}

export class CrearCitaDto{
    @IsUUID()
    medico_id!:string;

    @IsUUID()
    paciente_id!:string;

    @IsISO8601()
    inicio_cita!:string

    @IsISO8601()
    fin_cita!:string;
    
    @IsEnum(tipo_Cita)
    tipo_cita!:tipo_Cita

    @IsOptional()
    @IsString()
    @MaxLength(200)
    motivo?:string;
}*/