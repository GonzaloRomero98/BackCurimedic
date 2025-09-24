import { IsUUID, IsString, Length, IsNotEmpty, IsDateString } from "class-validator";

export class CrearRecepcionistaDto{
    @IsUUID()
    usuario_id:string

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
}