import { IsNotEmpty, IsString, Length } from "class-validator";
import { Unique } from "typeorm";

export class CrearEspecialidad{
    @IsString()
    @Length(1,150)
    @IsNotEmpty()
    nombre:string
}