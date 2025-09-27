import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { EspecialidadService } from "./especialidad.service";
import { CrearEspecialidad } from "./dto/crearEspecialidad.dto";

@Controller('especialidad')
export class EspecialidaController{
    constructor(private especialidadService:EspecialidadService){}

    @Post()
    @HttpCode(201)
    async crearEspecialidad(@Body() crearEspecialidad:CrearEspecialidad){
        return await this.especialidadService.crearEspecialidad(crearEspecialidad);
    }

    @Get('')
    async obtenerEspecialidad(){
        return this.especialidadService.obtenerEspecialiddes()
    }
}