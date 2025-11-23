import {
  UseGuards,
  Logger,
} from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { WsJwtGuard } from "src/common/guard/ws-jwt.guard";

const rooms = new Map<string, Set<string>>();

interface JoinPayload {
  roomId: string;
}

interface SignalPayload {
  to: string;
  type: "description" | "candidate";
  payload: any;
}

@WebSocketGateway({
  cors: { origin: "*" },
})
@UseGuards(WsJwtGuard)
export class WebRtcGateway implements OnGatewayDisconnect {
  private readonly logger = new Logger(WebRtcGateway.name);

  handleDisconnect(client: Socket) {
    for (const [roomId, members] of rooms) {
      if (members.delete(client.id)) {
        this.logger.log(
          `Cliente ${client.id} salió de la sala ${roomId}. Quedan: ${[
            ...members,
          ]}`,
        );

        // Avisar a los que quedan en la sala
        client.to(roomId).emit("usuario-desconectado", client.id);

        if (members.size === 0) {
          rooms.delete(roomId);
          this.logger.log(`Sala ${roomId} eliminada (vacía).`);
        }
      }
    }
  }

  @SubscribeMessage("join")
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinPayload,
  ) {
    const { roomId } = data;

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set<string>());
    }

    client.join(roomId);

    const room = client.nsp.adapter.rooms.get(roomId) || new Set<string>();
    const peers = [...room].filter((id)=> id !== client.id);


    this.logger.log(
      `Cliente ${client.id} se unió a sala ${roomId}. Miembros: ${[
        ...room,
      ]}`,
    );

  
    client.to(roomId).emit("usuario-conectado", {
      id: client.id,
      user: client.data?.user ?? null,
    });

    return {
      peers
    };
  }

  @SubscribeMessage("signal")
  handleSignal(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SignalPayload,
  ) {
    const { to, type, payload } = data;

    this.logger.debug(
      `Signal de ${client.id} hacia ${to}, type=${type}`,
    );

    client.to(to).emit("signal", {
      from: client.id,
      type,
      payload,
    });
  }
}