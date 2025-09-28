import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
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

    @HttpCode(204)
    @Delete('eliminar/:id')
    eliminarUsuario(@Param('id') id:string){
        return this.usuarioService.eliminarUsuario(id)
    }

    
}
