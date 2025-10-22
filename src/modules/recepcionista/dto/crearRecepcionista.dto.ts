import { Type } from "class-transformer";
import { IsUUID, IsString, Length, IsNotEmpty, IsDateString, IsInt } from "class-validator";

export class CrearRecepcionistaDto{
    @IsUUID()
    usuario_id:string

    @IsString()
    @Length(9,15)
    @IsNotEmpty()
    rut_recepcionista!:string

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
    fecha_nacimiento!:Date
    
    @IsString()
    @Length(1,150)
    direccion!:string

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    comuna_id!: number;
}