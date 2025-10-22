import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recepcionista } from "./entity/recepcionista.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearRecepcionistaDto } from "./dto/crearRecepcionista.dto";
import { Comuna } from "../comuna/entity/comuna.entity";

@Injectable()
export class RecepcionistaService{
    constructor(
        @InjectRepository(Recepcionista)
        private readonly recepcionistaRepository : Repository<Recepcionista>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository : Repository<Usuario>,
        @InjectRepository(Comuna)
        private readonly comunaRepository: Repository<Comuna>
    ){}

    async crearRecepcionista(crearRecepcionistadto : CrearRecepcionistaDto){
        const usuarioExistente = await this.usuarioRepository.findOne({where:{id:crearRecepcionistadto.usuario_id}});
        if(!usuarioExistente){
            throw new ConflictException('El usuario no existe')
        }

        const pacienteRutExistente = await this.recepcionistaRepository.findOne({where:{rut_recepcionista:crearRecepcionistadto.rut_recepcionista}})
        if(pacienteRutExistente){
            await this.usuarioRepository.delete(usuarioExistente.id);
            throw new ConflictException('El rut ingresado ya existe');
        }

        const comuna = await this.comunaRepository.findOne({ where: { comuna_id: crearRecepcionistadto.comuna_id }});
        if (!comuna) throw new ConflictException('La comuna no existe');



        try{
            const nuevoRecepcionista = this.recepcionistaRepository.create({
                usuario_id: crearRecepcionistadto.usuario_id,
                rut_recepcionista: crearRecepcionistadto.rut_recepcionista,
                nombres: crearRecepcionistadto.nombres,
                apellidos: crearRecepcionistadto.apellidos,
                celular: crearRecepcionistadto.celular,
                fecha_nacimiento: crearRecepcionistadto.fecha_nacimiento,
                direccion: crearRecepcionistadto.direccion,
                comuna: comuna
            });

            return this.recepcionistaRepository.save(nuevoRecepcionista)
        }catch(e:any){
            await this.usuarioRepository.delete(usuarioExistente.id);
        }
        
    }

    async buscarRecepcionista(usuario_id:string){
        const recepcionistaBusqueda = await this.recepcionistaRepository.findOne({where:{usuario_id:usuario_id}});
        return recepcionistaBusqueda;
    }

    async buscarTodosRecepcionsta(){
        return await this.recepcionistaRepository.find()
    }
}