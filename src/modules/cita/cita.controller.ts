import { Body, Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
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

    @Get('medico/:rut_medico')
    obtenerCitasByrut(@Param('rut_medico') rut_medico:string){
        return this.citaService.obtenerCitasByRutMedico(rut_medico);
    }

    @Get('paciente/:rut_paciente')
    obtenerCitasByruP(@Param('rut_paciente') rut_paciente:string){
        return this.citaService.obtenerCitasByRutPaciente(rut_paciente);
    }
}