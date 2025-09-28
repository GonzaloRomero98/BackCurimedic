import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medico } from "./entity/medico.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearMedicoDto } from "./dto/crearMedico.dto";
import { Especialidad } from "../especialidad/entity/especialidad.entity";
import { Comuna } from "../comuna/entity/comuna.entity";

@Injectable()
export class MedicoService{
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository : Repository<Medico>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository : Repository<Usuario>,
        @InjectRepository(Comuna)
        private readonly comunaRepository :Repository<Comuna>,
        @InjectRepository(Especialidad)
        private readonly especialidadRepository :Repository<Especialidad>
    ){}

    async crearMedico(crearMedicodto : CrearMedicoDto){
        const usuarioExistente = await this.usuarioRepository.findOne({where:{id: crearMedicodto.usuario_id}});
        if(!usuarioExistente){
            throw new ConflictException('El usuario no existe');
        }

        const medicoRutExistente = await this.medicoRepository.findOne({where:{rut_medico:crearMedicodto.rut_medico}})
        if(medicoRutExistente){
            throw new ConflictException('El rut ingresado ya existe');
        }

        const comuna = await this.comunaRepository.findOne({ where: { comuna_id: crearMedicodto.comuna_id }});
        if (!comuna) throw new ConflictException('La comuna no existe');

        let especialidad: Especialidad | null = null;
        if (crearMedicodto.especialidad_id != null) {especialidad = await this.especialidadRepository.findOne({where: { especialidad_id: crearMedicodto.especialidad_id },});
        if (!especialidad){
            throw new ConflictException('La especialidad no existe');
        } 
  }

        const nuevoMedico = this.medicoRepository.create({
            usuario: usuarioExistente,
            rut_medico: crearMedicodto.rut_medico,
            nombres: crearMedicodto.nombres,
            apellidos: crearMedicodto.apellidos,
            celular: crearMedicodto.celular,
            fecha_nacimiento: new Date(crearMedicodto.fecha_nacimiento),
            direccion: crearMedicodto.direccion,
            comuna: comuna,
            especialidad: especialidad ? especialidad : undefined,
         });

        return this.medicoRepository.save(nuevoMedico);
    }

    async buscarMedico(usuario_id:string){
        const medicoBusqueda = await this.medicoRepository.findOne({where:{usuario_id:usuario_id}});
        return medicoBusqueda;
    }

    async buscarTodosMedicos():Promise<Medico[]>{
        return await this.medicoRepository.find();
    }
}