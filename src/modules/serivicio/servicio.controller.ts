import { Controller, Get } from "@nestjs/common";
import { ServicioService } from "./servicio.service";

@Controller('servicio')
export class ServicioController{
    constructor(private servicioService:ServicioService){}

    @Get('all')
    obtenerServicio(){
        return this.servicioService.getSerivicios();
    }
}