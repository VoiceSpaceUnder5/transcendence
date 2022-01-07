import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// wait or start
const room = {};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startGame') // 기다리는 부분.
  gameStart(client: any, payload: any): any {
    // roomId가 있는지 확인하고 있으면 그 roomId로 같이 조인한다.
    const roomKeys = Object.keys(room);
    let isEmptyRoom = true;
    let waitingRoomId: string;
    // 빈 방 확인
    roomKeys.forEach((roomKey) => {
      if (room[roomKey] === 'wait') {
        isEmptyRoom = false;
        waitingRoomId = roomKey;
      }
    });
    if (isEmptyRoom) {
      const roomId = `${Math.random()}`;
      room[roomId] = 'wait';
      client.join(roomId);
      client.emit(`waitingGame`, {
        isLeft: true,
        roomId: roomId,
        welcome: `${roomId}에 입장`,
      });
    } else {
      client.join(waitingRoomId);
      client.emit(`waitingGame`, {
        isLeft: false,
        roomId: waitingRoomId,
        welcome: `${room[0]}에 입장`,
      });
      room[waitingRoomId] = 'start';
      this.server.in(waitingRoomId).emit('matchGame');
    }
  }

  @SubscribeMessage('hitBall')
  updateBall(client: any, payload: any): any {
    // Ball위치 업데이트
    this.server.to(payload.roomId).emit('updateBall', payload.ballInfo);
  }

  @SubscribeMessage('exitGame')
  exitGame(client: any, payload: any): any {
    // 누가 게임을 종료하였다.
    this.server.to(payload.roomId).emit('exitedGame');
    delete room[payload.roomId];
  }

  @SubscribeMessage('paddleMoving')
  updatePaddle(client: any, payload: any): any {
    //paddle 위치 업데이트
    this.server.to(payload.roomId).emit('movedOtherPaddle', payload);
  }
}
