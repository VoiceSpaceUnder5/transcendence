import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleMessage(
    @MessageBody() body: { channelId: number; userId: number; name: string },
    @ConnectedSocket() socket: Socket,
  ): void {
    socket
      .to(`${body.channelId}`)
      .emit('notice', { message: `${body.name}님이 참여했습니다.` });
    socket.join(`${body.channelId}`);
  }

  @SubscribeMessage('sendToServer')
  sendMessage(
    @MessageBody()
    body: {
      channelId: number;
      userId: number;
      name: string;
      message: string;
    },
  ): void {
    this.server.in(`${body.channelId}`).emit('sendToClient', {
      userId: body.userId,
      name: body.name,
      message: body.message,
    });
  }
}
