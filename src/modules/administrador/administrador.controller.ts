import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AdministradorService } from "./administrador.service";
import { CrearAdminDto } from "./dto/crearAdmin.dto";

@Controller('administrador')
export class AdministradorController{
    constructor(private administradorService : AdministradorService){}
    
    @Post()
    @HttpCode(201)
    crearAdmin(@Body() crearAdminDto: CrearAdminDto){
        return this.administradorService.crearAdmin(crearAdminDto)
    }

    @Get()
    @HttpCode(200)
    buscarAdministrador(usuario_id:string){
        return this.administradorService.buscarAdministrador(usuario_id);
    }
}