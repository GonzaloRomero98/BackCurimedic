import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recepcionista } from "./entity/recepcionista.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearRecepcionistaDto } from "./dto/crearRecepcionista.dto";

@Injectable()
export class RecepcionistaService{
    constructor(
        @InjectRepository(Recepcionista)
        private readonly recepcionistaRepository : Repository<Recepcionista>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository : Repository<Usuario>
    ){}

    async crearRecepcionista(crearRecepcionistadto : CrearRecepcionistaDto){
        const usuarioExistente = await this.usuarioRepository.findOne({where:{id:crearRecepcionistadto.usuario_id}});
        if(!usuarioExistente){
            throw new ConflictException('El usuario no existe')
        }

        const nuevoRecepcionista = this.recepcionistaRepository.create({
            usuario_id: crearRecepcionistadto.usuario_id,
            nombres: crearRecepcionistadto.nombres,
            apellidos: crearRecepcionistadto.apellidos,
            celular: crearRecepcionistadto.celular,
            fecha_nacimiento: crearRecepcionistadto.fecha_nacimiento,
            direccion: crearRecepcionistadto.direccion
        });

        return this.recepcionistaRepository.save(nuevoRecepcionista)
    }

    async buscarRecepcionista(usuario_id:string){
        const recepcionistaBusqueda = await this.recepcionistaRepository.findOne({where:{usuario_id:usuario_id}});
        return recepcionistaBusqueda;
    }

    async buscarTodosRecepcionsta(){
        return await this.recepcionistaRepository.find()
    }
}