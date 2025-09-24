import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medico } from "./entity/medico.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearMedicoDto } from "./dto/crearMedico.dto";

@Injectable()
export class MedicoService{
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository : Repository<Medico>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository : Repository<Usuario>,
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

        const nuevoMedico = this.medicoRepository.create({
            usuario_id: crearMedicodto.usuario_id,
            rut_medico: crearMedicodto.rut_medico,
            nombres: crearMedicodto.nombres,
            apellidos: crearMedicodto.apellidos,
            celular: crearMedicodto.celular,
            fecha_nacimiento: crearMedicodto.fecha_nacimiento,
            direccion: crearMedicodto.direccion,
            especialidad: crearMedicodto.especialidad,
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