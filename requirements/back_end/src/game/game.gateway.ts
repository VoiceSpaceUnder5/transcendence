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
  leftUserReady: boolean;
  rightUserReady: boolean;
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
    if (!client) throw new Error('Method not implemented.');
    users.push({
      clientId: client.id,
      gameStatus: GameStatus.waiting,
      roomId: '',
    });
  }
  // 나가면 유저 지우기, 룸 지우기.
  handleDisconnect(client: any) {
    if (!client) throw new Error('Method not implemented.');
    // rooms, users update
    if (rooms.length) {
      rooms.forEach((room, i) => {
        if (
          room.leftUser?.clientId === client.id ||
          room.rightUser?.clientId === client.id
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
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('startGame') // 기다리는 부분.
  gameStart(
    client: any,
    { isHard, isLadder }: { isHard: boolean; isLadder: boolean },
  ): any {
    // roomId가 있는지 확인하고 있으면 그 roomId로 같이 조인한다.
    let isEmptyRoom = true;
    let roomArrIndex = -1;
    // 빈 방 확인
    rooms.forEach((room, i) => {
      if (!room.rightUser && room.isHard === isHard) {
        isEmptyRoom = false;
        roomArrIndex = i;
        return;
      }
    });
    // 처음 들어옴
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
        leftUserReady: false,
        rightUserReady: false,
        roomId: roomId,
        isHard: isHard,
      };
      rooms.push(room);
      users.push(userInfo);
      client.join(roomId);
      client.emit(`waitingGame`, {
        isLeft: true,
        roomId: roomId,
        isHard: isHard,
      });
      // 두번째로 들어옴
    } else {
      const userInfo: UserInfo = {
        roomId: rooms[roomArrIndex].roomId,
        clientId: client.id,
        gameStatus: GameStatus.waiting,
      };
      rooms[roomArrIndex].rightUser = userInfo;
      rooms[roomArrIndex].leftUser.gameStatus = GameStatus.start;
      client.join(userInfo.roomId);
      client.emit(`waitingGame`, {
        isLeft: false,
        roomId: userInfo.roomId,
        isHard: isHard,
      });
      this.server.in(rooms[roomArrIndex].roomId).emit('allIn');
    }
  }
  @SubscribeMessage('ready')
  start(client: any, { roomId }: { roomId: string }): any {
    // 시작버튼 누르기. matchGame을 양쪽에다 불러주면 된다.
    console.log('room id : ', roomId);
    rooms.forEach((room) => {
      if (room.roomId === roomId) {
        if (client.id === room.leftUser.clientId) {
          console.log('왼쪽');
          room.leftUserReady = true;
          room.leftUser.gameStatus = GameStatus.start;
        } else if (client.id === room.rightUser.clientId) {
          console.log('오른쪽');
          room.rightUserReady = true;
          room.rightUser.gameStatus = GameStatus.start;
        }
        if (room.rightUserReady && room.leftUserReady)
          this.server.in(room.roomId).emit('matchGame');
        return;
      }
    });
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
  }

  @SubscribeMessage('exitGame')
  exitGame(client: any, payload: any): any {
    this.server.to(payload.roomId).emit('forceQuit');
    // 누가 게임을 종료하였다.
    rooms.forEach((room, i) => {
      if (room.roomId === payload.roomId) {
        rooms.splice(i, 1);
        return;
      }
    });
  }

  @SubscribeMessage('paddleMoving')
  updatePaddle(client: any, payload: any): any {
    //paddle 위치 업데이트
    this.server.to(payload.roomId).emit('movedOtherPaddle', payload);
  }
}
