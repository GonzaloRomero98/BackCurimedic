import { Module } from "@nestjs/common";
import { ServicioController } from "./servicio.controller";
import { ServicioService } from "./servicio.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Servicio } from "./entity/servicio.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Servicio])],
    controllers:[ServicioController],
    providers:[ServicioService]
})
export class ServicioModule{

}