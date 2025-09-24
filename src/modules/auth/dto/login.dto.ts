import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto{
    @IsEmail()
    @Length(1,100)
    correo!:string;

    @IsNotEmpty()
    @Length(1,255)
    contrasena!:string;
}