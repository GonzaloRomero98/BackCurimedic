import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Paciente } from "./entity/paciente.entity";
import { PacienteController } from "./paciente.controller";
import { PacienteService } from "./paciente.service";
import { Usuario } from "../usuario/entity/usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Paciente,Usuario])],
    controllers: [PacienteController],
    providers: [PacienteService],
    exports:[TypeOrmModule,PacienteService]
})

export class PacienteModule {}