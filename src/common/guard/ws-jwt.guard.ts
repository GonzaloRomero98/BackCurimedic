import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor( private readonly authService: AuthService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client  = context.switchToWs().getClient();
        const token: string | undefined = client.handshake?.auth?.token || client.handshake?.headers?.authorization?.toString().replace(/^Bearer\s+/i, '');
        if(!token){
            throw new WsException(new UnauthorizedException('Token Requerido'));
        }
        try{
            const user = await this.authService.verificarToken(token);
            client.data.user = user;
            return true;
        }catch(err){
            throw new WsException(new UnauthorizedException('Token invalido'));
        }
    }
}