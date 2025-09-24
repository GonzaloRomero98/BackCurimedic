import { IsNotEmpty, IsString, IsUUID, Length,IsDateString } from "class-validator";

export class CrearMedicoDto{
    @IsUUID()
    usuario_id:string

    @IsString()
    @Length(9,15)
    @IsNotEmpty()
    rut_medico:string

    @IsString()
    @Length(1,100)
    @IsNotEmpty()
    nombres!:string

    @IsString()
    @Length(1,100)
    @IsNotEmpty()
    apellidos!:string

    @IsString()
    @Length(1,9)
    celular!:string

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento:Date

    @IsString()
    @Length(1,150)
    direccion!:string

    @IsString()
    @Length(1,255)
    especialidad!:string
}