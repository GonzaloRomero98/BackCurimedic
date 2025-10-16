import { Body, Controller, HttpCode, Post,Get, ParseIntPipe, Param } from "@nestjs/common";
import { MedicoService } from "./medico.service";
import { CrearMedicoDto } from "./dto/crearMedico.dto";

@Controller('medico')
export class MedicoController{
    constructor( private medicoService : MedicoService){}

    @Post()
    @HttpCode(201)
    crearMedico(@Body() crearMedicodto : CrearMedicoDto){
        return  this.medicoService.crearMedico(crearMedicodto)
    }

    @Get()
    @HttpCode(200)
    buscarMedico(@Body() usuario_id:string){
        return this.medicoService.buscarMedico(usuario_id);
    }

    @Get('/all')
    getAllMedicos(){
        return this.medicoService.buscarTodosMedicos();
    }

    @Get('/especialidad/:id')
    getMedicosbyEspecialidad(@Param('id',ParseIntPipe) especialidadId:number){
        return this.medicoService.buscarMedicosPorEspecialidad(especialidadId);
    }
}