import { Controller, Get, Param } from "@nestjs/common";
import { ComunaService } from "./comuna.service";
import { number } from "joi";

@Controller('comuna')
export class ComunaController{
    constructor(private comunaService:ComunaService){}

    @Get('')
    async obtenerComunas(){
        return await this.comunaService.getComunas()
    }

    @Get(':nombre')
    async obternerComunaByName(@Param('nombre') nombre: string){
        return await this.comunaService.getComunaByName(nombre);
    }
}