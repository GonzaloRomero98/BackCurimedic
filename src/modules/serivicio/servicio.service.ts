import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Servicio } from "./entity/servicio.entity";
import { Repository } from "typeorm";

@Injectable()
export class ServicioService{
    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRepository:Repository<Servicio>
    ){}

    async getSerivicios():Promise<Servicio[]>{
        return await this.servicioRepository.find()
    }
}
