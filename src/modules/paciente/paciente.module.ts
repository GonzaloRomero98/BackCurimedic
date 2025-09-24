import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Paciente } from "./entity/paciente.entity";
import { PacienteController } from "./paciente.controller";
import { PacienteService } from "./paciente.service";
import { Usuario } from "../usuario/entity/usuario.entity";
import { ComunaModule } from "../comuna/comuna.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Paciente,Usuario]),
        ComunaModule
    ],
    controllers: [PacienteController],
    providers: [PacienteService],
    exports:[TypeOrmModule,PacienteService]
})

export class PacienteModule {}