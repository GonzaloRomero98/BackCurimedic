import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class ServicioDto{
    @IsString()
    @Length(1,150)
    @IsNotEmpty()
    nombre!:string;

    @IsInt()
    @IsNotEmpty()
    duracion!:number;
}