import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, IsEnum, Length } from 'class-validator';

enum UserRole {
    ADMIN = 'ADMIN',
    DOCTOR = 'DOCTOR',
    PACIENTE = 'PACIENTE',
    RECEPCIONISTA = 'RECEPCIONISTA',
}

export class CrearUsuarioDto{

    @IsEmail()
    @Length(1,100)
    @IsNotEmpty()
    correo! : string;

    @IsString()
    @Length(1,255)
    @IsNotEmpty()
    contrasena!: string;

    @IsEnum(UserRole)
    rol!: UserRole;
}