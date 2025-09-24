import { Module } from "@nestjs/common";
import { AdministradorController } from "./administrador.controller";
import { AdministradorService } from "./administrador.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Administrador } from "./entity/administrador.entity";
import { Usuario } from "../usuario/entity/usuario.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Administrador,Usuario])],
    controllers:[AdministradorController],
    providers:[AdministradorService],
    exports:[AdministradorService]
})

export class AdministradorModule{

}