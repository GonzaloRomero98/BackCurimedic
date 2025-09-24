import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Paciente } from "./entity/paciente.entity";
import { In, Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearPacienteDto } from "./dto/crearPaciente.dto";

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
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

        const nuevoPaciente = this.pacienteRepository.create({
            usuario_id: crearPacientedto.usuario_id,
            rut_paciente: crearPacientedto.rut_paciente,
            nombres: crearPacientedto.nombres,
            apellidos: crearPacientedto.apellidos,
            celular: crearPacientedto.celular,
            fecha_nacimiento: crearPacientedto.fecha_nacimiento,
            direccion: crearPacientedto.direccion,
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
}