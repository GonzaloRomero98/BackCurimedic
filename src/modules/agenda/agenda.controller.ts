/*import { Body, Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { AgendaService } from "./agenda.service";
import { CrearCitaDto } from "./dto/crearCitaDto";

@Controller('agenda')
export class AgendaController{
    constructor(private readonly agenda: AgendaService){}

    @Post()
    async crearCita(@Body() citaDto: CrearCitaDto){
        return  await this.agenda.crearCita(citaDto)
    }

}*/