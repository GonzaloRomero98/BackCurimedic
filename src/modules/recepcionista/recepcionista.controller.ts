import { Controller, HttpCode, Post, Body,Get } from "@nestjs/common";
import { CrearRecepcionistaDto } from "./dto/crearRecepcionista.dto";
import { RecepcionistaService } from "./recepcionista.service";

@Controller('recepcionista')
export class RecepcionistaController{
    constructor(private recepcionistaService: RecepcionistaService){}
    @Post()
    @HttpCode(201)
    crearRecepcionista(@Body()crearRecepcionistadto : CrearRecepcionistaDto){
        return this.recepcionistaService.crearRecepcionista(crearRecepcionistadto)
    }

    @Get('/all')
    obtenerAllRecepcionistar(){
        return this.recepcionistaService.buscarTodosRecepcionsta();
    }
}