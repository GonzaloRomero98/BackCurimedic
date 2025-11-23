import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Especialidad } from "./entity/especialidad.entity";
import { Repository } from "typeorm";
import { CrearEspecialidad } from "./dto/crearEspecialidad.dto";

@Injectable()
export class EspecialidadService{
    constructor(
        @InjectRepository(Especialidad)
        private readonly EspecialidadRepository:Repository<Especialidad>,
    ){}

    async crearEspecialidad(crearEspecialidad:CrearEspecialidad){
        const especialidadExiste = await this.EspecialidadRepository.findOne({where:{nombre:crearEspecialidad.nombre}})
        if(especialidadExiste){
            return new ConflictException('La especialidad no existe');
        }
        const nuevaEspecialidad = this.EspecialidadRepository.create({
            nombre:crearEspecialidad.nombre,
            activo:true
        });
        return this.EspecialidadRepository.save(nuevaEspecialidad);
    }

    async obtenerEspecialiddes():Promise<Especialidad[]>{
        console.log("entro al service");
        return await this.EspecialidadRepository.find();
    }

    async obtenerEspecialidadById(especialidad_id:number){
        return await this.EspecialidadRepository.findOne({where:{especialidad_id}});
    }
}