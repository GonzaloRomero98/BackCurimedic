import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Especialidad } from "./entity/especialidad.entity";
import { EspecialidaController } from "./especialida.controller";
import { EspecialidadService } from "./especialidad.service";

@Module({
    imports:[TypeOrmModule.forFeature([Especialidad])],
    controllers:[EspecialidaController],
    providers:[EspecialidadService],
    exports:[TypeOrmModule]
})

export class EspecialidaModule{}