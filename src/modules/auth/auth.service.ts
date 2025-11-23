import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from "../usuario/usuario.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { PacienteService } from "../paciente/paciente.service";
import { MedicoService } from "../medico/medico.service";
import { AdministradorService } from "../administrador/administrador.service";
import { RecepcionistaService } from "../recepcionista/recepcionista.service";
import { th } from "date-fns/locale";


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private pacienteService:PacienteService,
        private jwtService: JwtService,
        private medicoService : MedicoService,
        private administradorService :AdministradorService,
        private recepcionistaService : RecepcionistaService
    ){}

    //Funcion del login
    async login(correo:string, contrasena: string): Promise<any>{
        //Verificas si existe algun usuario con correo
        const usuario = await this.usuarioService.encontrarUsuario(correo);
        if(!usuario){
            throw new UnauthorizedException('credenciales Invalidas');
        }

        //Verificar que la contraseña del usuario es correcta
        const hashpswcompare = await bcrypt.compare(contrasena, usuario.contrasena)
        if(!hashpswcompare){
            throw new UnauthorizedException('credenciales invalidas');
        }

        //Obtienes los datos del usuario logeado
        const datosUsuario = await this.busquedaUsuarioDatos(usuario.rol,usuario.id);

        const payload = {
            sub:usuario.id, 
            correo: usuario.correo,
            rol: usuario.rol
        };
        
        //Genera un token
        const access_token = this.jwtService.sign(payload);
        return {access_token,datosUsuario}
    }

    //Funcion de busqueda de los datos de usuario por el rol
    async busquedaUsuarioDatos(rol:string, id:string){
        if(rol === 'PACIENTE'){
            return await this.pacienteService.buscarPaciente(id);
        }else if (rol === 'DOCTOR'){
            return await this.medicoService.buscarMedico(id);
        }else if(rol === 'ADMIN'){
            return await this.administradorService.buscarAdministrador(id);
        }else{
            return await this.recepcionistaService.buscarRecepcionista(id);
        }
    }

    async verificarToken(token:string){
        try{
            const payload = await this.jwtService.verify(token);
            const usuario = await this.usuarioService.obtenerUsuarioById(payload.sub);
            if(!usuario){
                throw new UnauthorizedException('Usuario no encontrado');
            }
            return{
                id: usuario.id,
                correo: payload.correo,
                rol: payload.rol
            };
        }catch(err){
            throw new UnauthorizedException('Token invalido');
        }
    }
}