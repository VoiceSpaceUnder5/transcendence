import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { isEmpty } from 'class-validator';
import { RuleTester } from 'eslint';
import { isObjectType } from 'graphql';
import { identity } from 'rxjs';
import { Server } from 'socket.io';
import { CreateRecordInput } from 'src/record/dto/create-record.input';
import { RecordService } from 'src/record/record.service';
import { canvasHeight, canvasWidth } from './gameEngine';

interface User {
  userId: number;
  userName: string;
  isLeft: boolean;
  isPlayer: boolean;
  roomId: string;
}

export class Room {
  leftUser: User | null;
  rightUser: User | null;
  leftUserReady: boolean;
  rightUserReady: boolean;
  leftUserScore: number;
  rightUserScore: number;
  gameData: GameData;
  id: string;
  isStart: boolean;
  isHard: boolean;
  isLadder: boolean;

  constructor(
    id: string,
    isHard: boolean,
    isLadder: boolean,
    gameData: GameData,
  ) {
    this.leftUser = null;
    this.rightUser = null;
    this.leftUserReady = false;
    this.rightUserReady = false;
    this.leftUserScore = 0;
    this.rightUserScore = 0;
    this.gameData = gameData;
    this.id = id;
    this.isStart = false;
    this.isHard = isHard;
    this.isLadder = isLadder;
  }
}

export class Vec {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  vecDot(vec: Vec): number {
    return this.x * vec.x + this.y * vec.y;
  }
  vecAdd(vec: Vec): Vec {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }
  vecMult(num: number): Vec {
    return new Vec(this.x * num, this.y * num);
  }
}

export type Pos = Vec;

export enum ControllData {
  up,
  down,
  nothing,
}

interface PaddleControllData {
  leftPaddleControll: ControllData;
  oldLeftPaddleControll: ControllData;
  rightPaddleControll: ControllData;
  oldRightPaddleControll: ControllData;
}

export class GameData {
  leftPaddlePos: Pos;
  leftPaddleOldPos: Pos;
  leftPaddleVel: Vec;
  rightPaddlePos: Pos;
  rightPaddleOldPos: Pos;
  rightPaddleVel: Vec;
  ballPos: Pos;
  ballOldPos: Pos;
  ballVel: Vec;
  ballSpeed: number;
  paddleSpeed: number;
  paddleControll: PaddleControllData;

  constructor() {
    this.reset();
  }
  reset() {
    this.leftPaddlePos = new Vec(20, canvasHeight / 2);
    this.leftPaddleOldPos = new Vec(20, canvasHeight / 2);
    this.leftPaddleVel = new Vec(0, 0);
    this.rightPaddlePos = new Vec(canvasWidth - 20, canvasHeight / 2);
    this.rightPaddleOldPos = new Vec(canvasWidth - 20, canvasHeight / 2);
    this.rightPaddleVel = new Vec(0, 0);
    this.ballPos = new Vec(canvasWidth / 2, canvasHeight / 2);
    this.ballOldPos = new Vec(canvasWidth / 2, canvasHeight / 2);
    this.ballVel = new Vec(0, 0);
    this.ballSpeed = 10;
    this.paddleSpeed = 12;
    this.paddleControll = {
      leftPaddleControll: ControllData.nothing,
      rightPaddleControll: ControllData.nothing,
      oldLeftPaddleControll: ControllData.nothing,
      oldRightPaddleControll: ControllData.nothing,
    };
  }
}

// key: roomId, value: room
const rooms = {};

// just roomIds
// random room
const commonRoomIds: { id: string; isStart: boolean }[] = [];

// key: clientId, value: User
const users = {};

@WebSocketGateway(33000, {
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly recordService: RecordService) {}
  // updateRecordData(room: Room, winner: winState) {
  //   const record = new CreateRecordInput();
  //   record.leftUserId = room.leftUser.userId;
  //   record.rightUserId = room.rightUser.userId;
  //   record.modeId = room.isHard ? 'BM1' : 'BM0';
  //   record.typeId = room.isLadder ? 'BT1' : 'BT0';
  //   record.leftUserScore = room.leftUserScore;
  //   record.rightUserScore = room.rightUserScore;
  //   if (winner === winState.leftUserWin) record.resultId = 'BR0';
  //   else if (winner === winState.rightUserWin) record.resultId = 'BR1';
  //   else if (winner === winState.draw) record.resultId = 'BR2';
  //   else if (winner === winState.canceled) record.resultId = 'BR3';
  //   room.leftUserScore = 0;
  //   room.rightUserScore = 0;
  //   this.recordService.createRecord(record);
  // }
  // 유저 초기화
  handleConnection(client: any, ...args: any[]) {
    console.log('소켓이 연결되었습니다. : ', client.id);
  }
  // 나가면 유저 지우기, 룸 지우기.
  handleDisconnect(client: any) {
    if (!client) throw new Error('Method not implemented.');
    const user = users[client.id] as User;
    if (!user) return;
    if (user.isPlayer) {
      this.server.to(user.roomId).emit('forceQuit');
      delete rooms[user.roomId];
      commonRoomIds.forEach((commonRoomId, i) => {
        if (commonRoomId.id === user.roomId) {
          commonRoomIds.splice(i, 1);
          return;
        }
      });
    }
    delete users[client.id];
    console.log('소켓 연결이 끊겼습니다. : ', client.id);
  }
  @WebSocketServer()
  server: Server;

  gameStart(roomId: string) {
    setTimeout(() => {});
    this.server.to(roomId).emit('count3');
  }
  @SubscribeMessage('sendUserData')
  sendUserData(client: any, { userId }: { userId: number }): any {
    const user: User = {
      userId: userId,
      userName: 'testName',
      isLeft: true,
      isPlayer: false,
      roomId: '',
    };
    users[client.id] = user;
  }

  @SubscribeMessage('startGame')
  startGame(
    client: any,
    payload: {
      isRandomMatch: boolean;
      opponentUserId: number;
      isHard: boolean;
      isLadder: boolean;
      userId: number;
    },
  ): any {
    const user = users[client.id] as User;
    // 왜 처음에 소켓 연결이 늦는지 모르겠네???
    if (!user) return;
    user.isPlayer = true;
    // 랜덤 룸 매칭
    if (payload.isRandomMatch) {
      // 빈 방 있는지 확인.
      // 있으면 참가. 아니면 방만들고 기다리기. (기다리기는 front에서 처리)
      let isEmptyRoomExist = false;
      commonRoomIds.forEach((commonRoomId) => {
        if (!commonRoomId.isStart) {
          const room = rooms[commonRoomId.id] as Room;
          if (
            room.isHard === payload.isHard &&
            room.isLadder === payload.isLadder
          ) {
            room.rightUser = users[client.id];
            users[client.id].isLeft = false;
            users[client.id].roomId = room.id;
            commonRoomId.isStart = true;
            isEmptyRoomExist = true;
            client.join(room.id);
            this.server.to(room.id).emit('waitingRoom', { roomId: room.id });
            return;
          }
        }
      });
      // 새 방 만들기.
      if (!isEmptyRoomExist) {
        const roomId = Math.random().toString();
        client.join(roomId);

        const room = new Room(
          roomId,
          payload.isHard,
          payload.isLadder,
          new GameData(),
        );
        // 실제 방 생성.
        rooms[roomId] = room;
        room.leftUser = users[client.id];
        users[client.id].roomId = room.id;
        users[client.id].isLeft = true;
        commonRoomIds.push({ id: roomId, isStart: false });
      }
    } else {
      // random매칭이 아닌경우.
      // client에서 socket을 언제 만들지 생각을 먼저 한 후에 처리하자\
      console.log(
        'random매칭이 아닌경우는 아직 구현하지 않았습니다. 테스트 시 이 로그가 나오면 안됩니다.',
      );
    }
  }

  @SubscribeMessage('ready')
  ready(client: any, { roomId }: { roomId: string }): any {
    const room = rooms[roomId] as Room;
    const user = users[client.id] as User;
    if (!room || !user) return;
    if (user === room.leftUser) {
      room.leftUserReady = true;
    } else if (user === room.rightUser) {
      room.rightUserReady = true;
    }
    if (room.leftUserReady && room.rightUserReady) {
      this.server.to(roomId).emit('test', '둘 다 준비되었다.');
      room.isStart = true;
      // 게임 시작 counter 돌리자
      this.server.to(roomId).emit('count3');
      setTimeout(() => {
        this.server.to(roomId).emit('count2');
      }, 1000);
      setTimeout(() => {
        this.server.to(roomId).emit('count1');
      }, 2000);
      setTimeout(() => {
        room.isStart = true;
      }, 3000);
    }
  }
  // event 받기
  @SubscribeMessage('inputEvent')
  inputEvent(
    client: any,
    { controllData, roomId }: { controllData: ControllData; roomId: string },
  ): any {
    const room = rooms[roomId] as Room;
    if (users[client.id].isPlayer) {
      if (users[client.id].isLeft) {
        room.gameData.paddleControll.oldLeftPaddleControll =
          room.gameData.paddleControll.leftPaddleControll;
        room.gameData.paddleControll.leftPaddleControll = controllData;
      } else if (!users[client.id].isLeft) {
        room.gameData.paddleControll.oldRightPaddleControll =
          room.gameData.paddleControll.rightPaddleControll;
        room.gameData.paddleControll.rightPaddleControll = controllData;
      }
    }
  }

  @SubscribeMessage('test')
  test(client: any, { userId }: { userId: number }): any {}
}
