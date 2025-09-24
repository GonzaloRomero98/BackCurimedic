import { IsDateString, IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export class CrearAdminDto {
    @IsUUID()
    usuario_id!:string

    @IsString()
    @Length(1,100)
    @IsNotEmpty()
    nombres!:string

    @IsString()
    @Length(1,100)
    @IsNotEmpty()
    apellidos!:string
}