/*import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AgendaCita } from "./entity/agenda.entity";
import { CrearCitaDto } from "./dto/crearCitaDto";

@Injectable()
export class AgendaService{
    constructor(
        @InjectRepository(AgendaCita)
        private readonly agendaCitaRepository: Repository<AgendaCita>
    ){}

    async crearCita(crearCita:CrearCitaDto){
        const nuevaCita = this.agendaCitaRepository.create({
            medico_id: crearCita.medico_id,
            paciente_id: crearCita.paciente_id,
            hora_inicio: crearCita.inicio_cita,
            hora_fin:crearCita.fin_cita,
            tipo_cita: crearCita.tipo_cita,
            motivo: crearCita.motivo
        })
        return nuevaCita
    }
}*/