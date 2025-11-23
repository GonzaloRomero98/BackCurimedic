import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comuna } from "./entity/comuna.entity";
import { Repository } from "typeorm";

@Injectable()
export class ComunaService{
    constructor(
        @InjectRepository(Comuna)
        private readonly comunaRepository:Repository<Comuna>,
    ){}

    async getComunas():Promise<Comuna[]>{
        return await this.comunaRepository.find();
    }

    async getComunaByName(nomnbre_comuna:string){
        return await this.comunaRepository.findOne({where:{nombre:nomnbre_comuna}})
    }
    
    async getComunaById(comuna_id:number){
        return await this.comunaRepository.findOne({where:{comuna_id}});
    }
}