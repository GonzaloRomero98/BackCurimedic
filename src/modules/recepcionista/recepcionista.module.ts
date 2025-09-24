import { Module } from "@nestjs/common";
import { RecepcionistaController } from "./recepcionista.controller";
import { RecepcionistaService } from "./recepcionista.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recepcionista } from "./entity/recepcionista.entity";
import { Usuario } from "../usuario/entity/usuario.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Recepcionista,Usuario])],
    controllers:[RecepcionistaController],
    providers:[RecepcionistaService],
    exports: [RecepcionistaService]
})

export class RecepcionistaModule{
    
}