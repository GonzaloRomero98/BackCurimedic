import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { PacienteService } from "./paciente.service";
import { CrearPacienteDto } from "./dto/crearPaciente.dto";

@Controller('paciente')

export class PacienteController {
    constructor( private pacienteServive :PacienteService){}
    
    @Post()
    @HttpCode(201)
    crearPaciente(@Body() crearPacientedto : CrearPacienteDto){
        return this.pacienteServive.crearPaciente(crearPacientedto)
    }

    @Get()
    @HttpCode(200)
    buscarPacienteById(@Body() usuario_id: string){
        return this.pacienteServive.buscarPaciente(usuario_id);
    }

    @Get('/all')
    obtenerAllPacientes(){
        return this.pacienteServive.buscarTodosPacientes()
    }
}
