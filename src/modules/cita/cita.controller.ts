import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CitaService } from "./cita.service";
import { CitaDto } from "./dto/cita.dto";

@Controller('cita')
export class CitaController{
    constructor(private citaService:CitaService){}
    @Post()
    @HttpCode(201)
    crearCita(@Body()citaDto:CitaDto){
        return this.citaService.crearCita(citaDto);
    }
    
    @Get()
    obtenerCita(){
        
    }
}