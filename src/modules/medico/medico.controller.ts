import { Body, Controller, HttpCode, Post,Get } from "@nestjs/common";
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

    @Get('/aLL')
    getAllMedicos(){
        return this.medicoService.buscarTodosMedicos();
    }
}