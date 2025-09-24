import { Module } from "@nestjs/common";
import { RecepcionistaController } from "./recepcionista.controller";
import { RecepcionistaService } from "./recepcionista.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recepcionista } from "./entity/recepcionista.entity";
import { Usuario } from "../usuario/entity/usuario.entity";
import { ComunaModule } from "../comuna/comuna.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Recepcionista,Usuario]),
        ComunaModule
    ],
    controllers:[RecepcionistaController],
    providers:[RecepcionistaService],
    exports: [RecepcionistaService]
})

export class RecepcionistaModule{
    
}