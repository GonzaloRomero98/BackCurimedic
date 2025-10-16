import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Paciente } from "./entity/paciente.entity";
import { In, Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearPacienteDto } from "./dto/crearPaciente.dto";
import { Comuna } from "../comuna/entity/comuna.entity";

type PacienteByRut = {
    rut_paciente:string;
    nombres:string;
    apellidos:string;
    celular:string;
    direccion:string;
    comuna_id:number | null;
}

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Comuna)
        private readonly comunaRepository :Repository<Comuna>,
    ){}

    async crearPaciente(crearPacientedto : CrearPacienteDto){
        const usuarioExistente = await this.usuarioRepository.findOne({where:{id:crearPacientedto.usuario_id}})
        if(!usuarioExistente){
            throw new ConflictException('El usuario no existe');
        }

        const pacienteRutExistente = await this.pacienteRepository.findOne({where:{rut_paciente:crearPacientedto.rut_paciente}})
        if(pacienteRutExistente){
            throw new ConflictException('El rut ingresado ya existe');
        }

        const comuna = await this.comunaRepository.findOne({ where: { comuna_id: crearPacientedto.comuna_id }});
        if (!comuna) throw new ConflictException('La comuna no existe');

        const nuevoPaciente = this.pacienteRepository.create({
            usuario: usuarioExistente,
            rut_paciente: crearPacientedto.rut_paciente,
            nombres: crearPacientedto.nombres,
            apellidos: crearPacientedto.apellidos,
            celular: crearPacientedto.celular,
            fecha_nacimiento: new Date(crearPacientedto.fecha_nacimiento),
            direccion: crearPacientedto.direccion,
            comuna: comuna
        });
        return this.pacienteRepository.save(nuevoPaciente);
    }

    async buscarPaciente(usuario_id:string){
        const pacienteBusqueda = await this.pacienteRepository.findOne({where:{usuario_id:usuario_id}})
        return pacienteBusqueda;
    }

    async buscarTodosPacientes():Promise<Paciente[]>{
        return await this.pacienteRepository.find();
    }

    async buscarPacienteByRut(rut: string): Promise<PacienteByRut | null> {
        const paciente = await this.pacienteRepository.findOne({
            select: {
                usuario_id: true,
                rut_paciente: true,
                nombres: true,
                apellidos: true,
                celular: true,
                direccion: true,
            },
            where: { rut_paciente: rut },
            relations: { comuna: true }
        });
        if (!paciente) {
            return null;
        }
        console.log(paciente);
        return {
            rut_paciente: paciente.rut_paciente,
            nombres: paciente.nombres,
            apellidos: paciente.apellidos,
            celular: paciente.celular,
            direccion: paciente.direccion,
            comuna_id: paciente.comuna?.comuna_id ?? null
        };
    }

}