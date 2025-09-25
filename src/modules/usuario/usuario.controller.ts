import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import { CrearUsuarioDto } from './dto/crearUsuario.dto';
@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService){}

    @Post()
    @HttpCode(201)
    CrearUser(@Body() crearUsuario: CrearUsuarioDto){
        return this.usuarioService.agregarUsuario(crearUsuario)
    }

    @Get('/all')
    ObtenerUsuarios(){
        return this.usuarioService.obtenerUsuarios()
    }

    
}
