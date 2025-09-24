import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Administrador } from "./entity/administrador.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuario/entity/usuario.entity";
import { CrearAdminDto } from "./dto/crearAdmin.dto";

@Injectable()
export class AdministradorService{
    constructor(
        @InjectRepository(Administrador)
        private readonly administradorRepository: Repository<Administrador>,

        @InjectRepository(Usuario)
        private readonly usuarioRepository : Repository<Usuario>
    ){}
    
    async crearAdmin(crearAdmin : CrearAdminDto){
        const usuarioExistente = await this.usuarioRepository.findOne({where:{id:crearAdmin.usuario_id}})
        if(!usuarioExistente){
            throw new ConflictException('El usuario no existe');
        }

        const nuevoAdmin = this.administradorRepository.create({
            usuario_id: crearAdmin.usuario_id,
            nombres: crearAdmin.nombres,
            apellidos: crearAdmin.apellidos,
        });

        return this.administradorRepository.save(nuevoAdmin);
    }

    async buscarAdministrador(usuario_id:string){
        const administradorBusqueda = await this.administradorRepository.findOne({where:{usuario_id: usuario_id}});
        console.log(administradorBusqueda)
        return administradorBusqueda;
    }
}