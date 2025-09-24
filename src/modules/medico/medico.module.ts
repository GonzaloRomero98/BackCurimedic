import { Module } from "@nestjs/common";
import { MedicoController } from "./medico.controller";
import { MedicoService } from "./medico.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medico } from "./entity/medico.entity";
import { Usuario } from "../usuario/entity/usuario.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Medico,Usuario])],
    controllers:[MedicoController],
    providers:[MedicoService],
    exports:[MedicoService]
})

export class MedicoModule{

}