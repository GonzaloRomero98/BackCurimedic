import { ConflictException, Injectable } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crearUsuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import {randomUUID} from 'crypto'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ){}

    async agregarUsuario(crearUsuarioDto: CrearUsuarioDto ){
        const existeUsuario = await this.usuarioRepository.findOne({where:{correo:crearUsuarioDto.correo}})
        if(existeUsuario){
            throw new ConflictException('El usuario ya existe');
        }
        const hashpsw = await bcrypt.hash(crearUsuarioDto.contrasena,10);
        const nuevoUsuario = this.usuarioRepository.create({
            id: randomUUID(),
            correo: crearUsuarioDto.correo,
            contrasena: hashpsw,
            rol: crearUsuarioDto.rol
        });

        return this.usuarioRepository.save(nuevoUsuario);
    }

    async encontrarUsuario(correo:string): Promise<Usuario| null>{
        return this.usuarioRepository.findOne({where:{correo:correo}});
    }

    async obtenerUsuarios():Promise<Usuario[]>{
        return await this.usuarioRepository.find();
    }

}