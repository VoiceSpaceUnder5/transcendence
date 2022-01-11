import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface UserInfo {
  clientId: number;
  gameStatus: GameStatus;
  roomId: string;
}

interface LosePayload {
  isLeft: boolean;
  id: number;
  roomId: string;
}

interface Room {
  leftUser: UserInfo | null;
  rightUser: UserInfo | null;
  roomId: string;
  isHard: boolean;
}

enum GameStatus {
  waiting,
  start,
}

const rooms: Room[] = [];
const users: UserInfo[] = [];

@WebSocketGateway(33000, {
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  // 유저 초기화
  handleConnection(client: any, ...args: any[]) {
    if (client) console.log('연결되었습니다.');
    else throw new Error('Method not implemented.');
    users.push({
      clientId: client.id,
      gameStatus: GameStatus.waiting,
      roomId: '',
    });
  }
  // 나가면 유저 지우기, 룸 지우기.
  handleDisconnect(client: any) {
    if (client) console.log('연결해제...', client.id);
    else throw new Error('Method not implemented.');
    // rooms, users update
    rooms.forEach((room, i) => {
      if (
        room.leftUser.clientId === client.id ||
        room.rightUser.clientId === client.id
      ) {
        this.server.to(room.roomId).emit('forceQuit');
        rooms.splice(i, 1);
        return;
      }
    });
    users.forEach((user, i) => {
      if (user.clientId === client.id) {
        users.splice(i, 1);
        return;
      }
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startGame') // 기다리는 부분.
  gameStart(client: any, { isHard }: { isHard: boolean }): any {
    // roomId가 있는지 확인하고 있으면 그 roomId로 같이 조인한다.
    let isEmptyRoom = true;
    let roomArrIndex = -1;
    // 빈 방 확인
    rooms.forEach((room, i) => {
      if (!room.rightUser && room.isHard === isHard) {
        console.log('유저가 있는 방 찾음.');
        isEmptyRoom = false;
        roomArrIndex = i;
        return;
      }
    });
    if (isEmptyRoom) {
      const roomId = `${Math.random()}`;
      // UserInfo임.
      // 유저 정보 업데이트
      const userInfo: UserInfo = {
        roomId: roomId,
        clientId: client.id,
        gameStatus: GameStatus.waiting,
      };
      // rooms.push(userInfo);
      const room: Room = {
        leftUser: userInfo,
        rightUser: null,
        roomId: roomId,
        isHard: isHard,
      };
      rooms.push(room);
      users.push(userInfo);
      client.join(roomId);
      client.emit(`waitingGame`, {
        isLeft: true,
        roomId: roomId,
        welcome: `${roomId}에 입장`,
      });
      console.log(`${roomId}에서 ${client.id}가 기다리고 있습니다.`);
    } else {
      const userInfo: UserInfo = {
        roomId: rooms[roomArrIndex].roomId,
        clientId: client.id,
        gameStatus: GameStatus.start,
      };
      rooms[roomArrIndex].rightUser = userInfo;
      rooms[roomArrIndex].leftUser.gameStatus = GameStatus.start;
      client.join(userInfo.roomId);
      client.emit(`waitingGame`, {
        isLeft: false,
        roomId: userInfo.roomId,
        welcome: `${rooms[roomArrIndex].roomId}에 입장`,
      });
      console.log(
        `${rooms[roomArrIndex].roomId}에 ${client.id}가 접속했습니다.`,
      );
      this.server.in(rooms[roomArrIndex].roomId).emit('matchGame');
    }
  }

  @SubscribeMessage('hitBall')
  updateBall(client: any, payload: any): any {
    // Ball위치 업데이트
    this.server.to(payload.roomId).emit('updateBall', payload.ballInfo);
  }

  // 짐.
  @SubscribeMessage('lose')
  updateRecord(client: any, payload: LosePayload): any {
    // 내 데이터 업데이트
    this.server
      .to(payload.roomId)
      .emit('win', { isWinnerLeft: !payload.isLeft });
    console.log('졌구나~!');
  }

  @SubscribeMessage('exitGame')
  exitGame(client: any, payload: any): any {
    // 누가 게임을 종료하였다.
    delete rooms[payload.roomId];
  }

  @SubscribeMessage('paddleMoving')
  updatePaddle(client: any, payload: any): any {
    //paddle 위치 업데이트
    this.server.to(payload.roomId).emit('movedOtherPaddle', payload);
  }
}
