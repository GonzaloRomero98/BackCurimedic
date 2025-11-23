import { Module } from "@nestjs/common";
import { CitaController } from "./cita.controller";
import { CitaService } from "./cita.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cita } from "./entity/cita.entity";
import { Medico } from "../medico/entity/medico.entity";
import { Paciente } from "../paciente/entity/paciente.entity";
import { CitaCronService } from "./cita.cron.service";

@Module({
    imports:[TypeOrmModule.forFeature([Cita,Medico,Paciente])],
    controllers:[CitaController],
    providers:[CitaService,CitaCronService]
})
export class CitaModule{
    
}