import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { CitaService } from "./cita.service";
import { CitaDto } from "./dto/cita.dto";
import { ConsultarCitaSlotDto } from "./dto/consultaCitaSlot.dto";

@Controller('cita')
export class CitaController{
    constructor(private citaService:CitaService){}
    @Post()
    @HttpCode(201)
    crearCita(@Body()citaDto:CitaDto){
        return this.citaService.crearCita(citaDto);
    }
    
    @Get()
    @HttpCode(200)
    obtenerCita(){
        return this.citaService.obtenerCita();
    }

    @Get('slots')
    consultarSlots(@Query() query: ConsultarCitaSlotDto){
        return this.citaService.consultarSlots(query);
    }
}