import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsuarioModule } from "../usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PacienteModule } from "../paciente/paciente.module";
import { MedicoModule } from "../medico/medico.module";
import { RecepcionistaModule } from "../recepcionista/recepcionista.module";
import { AdministradorModule } from "../administrador/administrador.module";

@Module({
    imports:[
        ConfigModule,
        UsuarioModule,
        PacienteModule,
        MedicoModule,
        RecepcionistaModule,
        AdministradorModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (cfg:ConfigService)=>({
                secret: cfg.get<string>('JWT_SECRET'),
                signOptions:{expiresIn:'1h'}
            })
        })
    ],
    controllers:[AuthController],
    providers:[AuthService]
})

export class AuthModule{}