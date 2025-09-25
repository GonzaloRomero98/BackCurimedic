import { Module } from "@nestjs/common";
import { MedicoController } from "./medico.controller";
import { MedicoService } from "./medico.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medico } from "./entity/medico.entity";
import { Usuario } from "../usuario/entity/usuario.entity";
import { ComunaModule } from "../comuna/comuna.module";
import { EspecialidaModule } from "../especialidad/especialida.module";
import { Comuna } from "../comuna/entity/comuna.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Medico,Usuario,Comuna]),
        ComunaModule,
        EspecialidaModule
    ],
    controllers:[MedicoController],
    providers:[MedicoService],
    exports:[MedicoService]
})

export class MedicoModule{

}