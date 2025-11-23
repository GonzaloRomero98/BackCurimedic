import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Medico } from "../medico/entity/medico.entity";
import { Paciente } from "../paciente/entity/paciente.entity";
import { Cita } from "./entity/cita.entity";
import { CitaDto } from "./dto/cita.dto";
import { randomUUID } from "crypto";
import { ConsultarCitaSlotDto } from "./dto/consultaCitaSlot.dto";
import { addHours, addMinutes, format, isBefore, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; 

type Slot ={
    inicio: string;
    fin: string;
    desabilitado: boolean;
}

@Injectable()
export class CitaService{
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,

        @InjectRepository(Cita)
        private readonly citaRepository:Repository<Cita>,
    ){}

    async crearCita(citadto:CitaDto){

        if(!/^\d{4}-\d{2}-\d{2}$/.test(citadto.fecha_cita)){
            throw new ConflictException('La fecha debe estar en formato AAAA-MM-DD');
        }

        if(!/^([01]\d|2[0-3]):00$/.test(citadto.hora_inicio)){
            throw new ConflictException('La hora de inicio debe estar en formato HH:MM:SS');
        }

        const existeMedico = await this.medicoRepository.findOne({where:{rut_medico: citadto.rut_medico}});
        if(!existeMedico){
            throw new ConflictException('El medico no existe');
        }
        const existePaciente = await this.pacienteRepository.findOne({where:{rut_paciente:citadto.rut_paciente}});
        if(!existePaciente){
            throw new ConflictException('El paciente no existe');
        }

        const existeCita = await this.citaRepository.findOne({where:{medico_id:existeMedico.usuario_id, fecha_cita:citadto.fecha_cita, inicio_cita:citadto.hora_inicio }})
        console.log(existeCita);
        if(existeCita){
            throw new ConflictException('Existe cita')
        }

        const nuevaCita = this.citaRepository.create({
            cita_id:randomUUID(),
            medico_id:existeMedico.usuario_id,
            paciente_id:existePaciente.usuario_id,
            servicio_id:citadto.servicio_id,
            fecha_cita:citadto.fecha_cita,
            inicio_cita:citadto.hora_inicio,
        });
        try{
            return this.citaRepository.save(nuevaCita);
        }catch(e){
            if(e?.code === 'ER_DUP_ENTRY' || e?.code === '1062'){
                throw new ConflictException('El bloque ya está reservado, elija otro');
            }
            if(e?.code === 'ER_CHECK_CONSTRAINT_VIOLATED' || e?.code === '3819'){
                throw new ConflictException('La hora de la cita no está dentro del horario del médico');
            }
            if(e?.code === 'ER_NO_REFERENCED_ROW_2' || e?.code === '1452'){
                throw new BadRequestException('El ID del médico o paciente no existe');
            }
            throw e;
        }

    }

    async obtenerCita(){
        return this.citaRepository.find();
    }

    async consultarSlots(consultaDto: ConsultarCitaSlotDto): Promise<Slot[]> {
        const { rut_medico, fecha_cita } = consultaDto;
        const hora_inicio = consultaDto.hora_inicio ?? '08:00';
        const hora_fin    = consultaDto.hora_fin    ?? '18:00';

        const medico = await this.medicoRepository.findOne({ where: { rut_medico }, select: ['usuario_id'] });
        if (!medico) throw new NotFoundException('Médico no encontrado');

        const inicioJornada = parse(`${fecha_cita} ${hora_inicio}`, 'yyyy-MM-dd HH:mm', new Date());
        const finJornada    = parse(`${fecha_cita} ${hora_fin}`,    'yyyy-MM-dd HH:mm', new Date());

        const slots: Slot[] = [];
        let cursor = inicioJornada;

        while (cursor < finJornada) {
            const slotStart = cursor;
            const slotEnd   = addMinutes(slotStart, 59);

            const inicio = format(slotStart, "yyyy-MM-dd'T'HH:mm:ss");
            const fin    = format(slotEnd,   "yyyy-MM-dd'T'HH:mm:ss"); 

            slots.push({ inicio, fin, desabilitado: false });
            cursor = addHours(cursor, 1);
        }

        const citas = await this.citaRepository.find({
            where: { medico_id: medico.usuario_id, fecha_cita },
            select: ['inicio_cita'],
            order: { inicio_cita: 'ASC' },
        });

        const ocupadas = new Set(citas.map(c => (typeof c.inicio_cita === 'string' ? c.inicio_cita.slice(0, 5) : '')));

        const tz = 'America/Santiago';
        const ahoraCL = toZonedTime(new Date(), tz);
        const hoy = format(ahoraCL, 'yyyy-MM-dd');
        const horaActual = parseInt(format(ahoraCL, 'HH'), 10);

        for (const s of slots) {
            const hhmm = s.inicio.substring(11, 16);
            const hh   = s.inicio.substring(11, 13);

            if (ocupadas.has(hhmm.replace(/:\d{2}$/, ':00'))) s.desabilitado = true;
            if (fecha_cita === hoy && parseInt(hh, 10) <= horaActual) s.desabilitado = true;
        }
        return slots;
    }

    async obtenerCitasByRutMedico(rut_medico:string){
        const medico = await this.medicoRepository.findOne({where:{rut_medico:rut_medico}, select:['usuario_id']});
        if(!medico){
            throw new NotFoundException('Médico no encontrado');
        }
        return await this.citaRepository.find({where:{medico_id:medico.usuario_id}});
    }

    async obtenerCitasByRutPaciente(rut_paciente:string){
        const paciente = await this.pacienteRepository.findOne({where:{rut_paciente:rut_paciente},select:['usuario_id']})
        if(!paciente){
            throw new NotFoundException('Médico no encontrado');
        }

        return await this.citaRepository.find({where:{paciente_id:paciente.usuario_id}});
    }
}