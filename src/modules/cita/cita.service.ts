import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Medico } from "../medico/entity/medico.entity";
import { Paciente } from "../paciente/entity/paciente.entity";
import { Cita } from "./entity/cita.entity";
import { CitaDto } from "./dto/cita.dto";
import { randomUUID } from "crypto";

@Injectable()
export class CitaService{
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,

        @InjectRepository(Cita)
        private readonly citaRepository:Repository<Cita>
    ){}

    async crearCita(citadto:CitaDto){
        const existeMedico = await this.medicoRepository.findOne({where:{rut_medico: citadto.rut_medico}});
        if(!existeMedico){
            throw new ConflictException('El medico no existe');
        }
        const existePaciente = await this.pacienteRepository.findOne({where:{rut_paciente:citadto.rut_paciente}});
        if(!existePaciente){
            throw new ConflictException('El paciente no existe');
        }

        const nuevaCita = this.citaRepository.create({
            cita_id:randomUUID(),
            medico_id:existeMedico.usuario_id,
            paciente_id:existePaciente.usuario_id,
            servicio_id:citadto.servicio_id,
            inicio_cita:citadto.hora_inicio,
            fin_cita:citadto.hora_final,
        })
        return this.citaRepository.save(nuevaCita);
    }
}