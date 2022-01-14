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
import { CreateRecordInput } from 'src/record/dto/create-record.input';
import { RecordService } from 'src/record/record.service';

enum winState {
  leftUserWin,
  rightUserWin,
  draw,
  canceled,
}

interface UserInfo {
  clientId: number;
  gameStatus: GameStatus;
  roomId: string;
  userId: number;
}

interface LosePayload {
  isLeft: boolean;
  id: number;
  roomId: string;
}

interface Room {
  leftUser: UserInfo | null;
  rightUser: UserInfo | null;
  leftUserScore: number;
  rightUserScore: number;
  leftUserReady: boolean;
  rightUserReady: boolean;
  roomId: string;
  isHard: boolean;
  isLadder: boolean;
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
  constructor(private readonly recordService: RecordService) {}
  updateRecordData(room: Room, winner: winState) {
    const record = new CreateRecordInput();
    record.leftUserId = room.leftUser.userId;
    record.rightUserId = room.rightUser.userId;
    record.modeId = room.isHard ? 'BM1' : 'BM0';
    record.typeId = room.isLadder ? 'BT1' : 'BT0';
    record.leftUserScore = room.leftUserScore;
    record.rightUserScore = room.rightUserScore;
    if (winner === winState.leftUserWin) record.resultId = 'BR0';
    else if (winner === winState.rightUserWin) record.resultId = 'BR1';
    else if (winner === winState.draw) record.resultId = 'BR2';
    else if (winner === winState.canceled) record.resultId = 'BR3';
    room.leftUserScore = 0;
    room.rightUserScore = 0;
    this.recordService.createRecord(record);
  }
  // 유저 초기화
  handleConnection(client: any, ...args: any[]) {
    if (!client) throw new Error('Method not implemented.');
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
          // 종료한 사람이 짐.
          if (!(room.rightUserScore === 0 && room.leftUserScore === 0)) {
            room.leftUser.clientId === client.id
              ? this.updateRecordData(room, winState.rightUserWin)
              : this.updateRecordData(room, winState.leftUserWin);
          }
          this.server.to(room.roomId).emit('forceQuit');
          rooms.splice(i, 1);
          users.forEach((user, i) => {
            if (user.clientId === client.id) {
              users.splice(i, 1);
            }
          });
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

  @SubscribeMessage('startGame')
  gameStart(
    client: any,
    {
      isHard,
      isLadder,
      userId,
    }: { isHard: boolean; isLadder: boolean; userId: number },
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
        userId: userId,
      };
      // rooms.push(userInfo);
      const room: Room = {
        leftUser: userInfo,
        rightUser: null,
        leftUserReady: false,
        rightUserReady: false,
        leftUserScore: 0,
        rightUserScore: 0,
        roomId: roomId,
        isHard: isHard,
        isLadder: isLadder,
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
        userId: userId,
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
    rooms.forEach((room) => {
      if (room.roomId === roomId) {
        if (client.id === room.leftUser.clientId) {
          room.leftUserReady = true;
          room.leftUser.gameStatus = GameStatus.start;
        } else if (client.id === room.rightUser.clientId) {
          room.rightUserReady = true;
          room.rightUser.gameStatus = GameStatus.start;
        }
        if (room.rightUserReady && room.leftUserReady) {
          this.server.in(room.roomId).emit('matchGame');
          room.rightUserReady = false;
          room.leftUserReady = false;
        }
        return;
      }
    });
  }

  @SubscribeMessage('restart')
  restart(client: any, { roomId }: { roomId: string }): any {
    rooms.forEach((room) => {
      if (room.roomId === roomId) {
        if (client.id === room.leftUser.clientId) {
          room.leftUserReady = true;
          room.leftUser.gameStatus = GameStatus.start;
        } else if (client.id === room.rightUser.clientId) {
          room.rightUserReady = true;
          room.rightUser.gameStatus = GameStatus.start;
        }
        if (room.rightUserReady && room.leftUserReady) {
          this.server.in(room.roomId).emit('restartGame');
          room.rightUserReady = false;
          room.leftUserReady = false;
        }
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
    let isWinnerLeft: boolean;
    rooms.forEach((room) => {
      if (room.roomId === payload.roomId) {
        client.id === room.leftUser.clientId
          ? room.rightUserScore++ || (isWinnerLeft = false)
          : room.leftUserScore++ || (isWinnerLeft = true);
        isWinnerLeft = client.id === room.rightUser.clientId;
        if (room.rightUserScore >= 5 || room.leftUserScore >= 5) {
          // 데이터 업데이트 후 스코어 초기화
          if (room.rightUserScore >= 5)
            this.updateRecordData(room, winState.rightUserWin);
          else this.updateRecordData(room, winState.leftUserWin);

          this.server
            .to(room.roomId)
            .emit('done', { isWinnerLeft: isWinnerLeft });
        } else {
          this.server
            .to(room.roomId)
            .emit('oneGame', { isWinnerLeft: isWinnerLeft });

          this.server.to(room.roomId).emit('wait3');

          setTimeout(() => {
            this.server.to(room.roomId).emit('wait2');
          }, 1000);
          setTimeout(() => {
            this.server.to(room.roomId).emit('wait1');
          }, 2000);
          setTimeout(() => {
            this.server.to(room.roomId).emit('restartGame');
          }, 3000);
        }
        return;
      }
    });

    // room.recordInput.leftUserId = userId;
    // room.recordInput.modeId = isHard ? 'BM1' : 'BM0';
    // room.recordInput.typeId = isLadder ? 'BT1' : 'BT0';
    this.server
      .to(payload.roomId)
      .emit('win', { isWinnerLeft: !payload.isLeft });
  }

  @SubscribeMessage('exitGame')
  exitGame(client: any, payload: any): any {
    this.server.to(payload.roomId).emit('forceQuit');
  }

  @SubscribeMessage('paddleMoving')
  updatePaddle(client: any, payload: any): any {
    //paddle 위치 업데이트
    this.server.to(payload.roomId).emit('movedOtherPaddle', payload);
  }
}
