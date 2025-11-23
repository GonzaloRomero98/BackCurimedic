import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { EspecialidadService } from "./especialidad.service";
import { CrearEspecialidad } from "./dto/crearEspecialidad.dto";

@Controller('especialidad')
export class EspecialidaController{
    constructor(
        private especialidadService:EspecialidadService
    ){}

    @Post()
    @HttpCode(201)
    async crearEspecialidad(@Body() crearEspecialidad:CrearEspecialidad){
        return await this.especialidadService.crearEspecialidad(crearEspecialidad);
    }

    @Get()
    async obtenerEspecialidad(){
        console.log("entro al controller");
        return this.especialidadService.obtenerEspecialiddes()
    }

    @Get(':especialidad_id')
    async obtenerEspecialidadById(@Param('especialidad_id') especialidad_id:number){
        console.log(especialidad_id);
        return this.especialidadService.obtenerEspecialidadById(especialidad_id)
    }
}