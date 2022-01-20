import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RecordService } from 'src/record/record.service';
import { UsersService } from 'src/users/user.service';
import { AchievementService } from 'src/achievement/achievement.service';
import gameEngine, {
  canvasWidth,
  GameScoreData,
  makeRecord,
} from './gameEngine';

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

  constructor(isHard: boolean) {
    this.reset(isHard);
  }
  reset(isHard: boolean) {
    this.leftPaddlePos = new Vec(-canvasWidth / 2 + 20, 0);
    this.leftPaddleOldPos = new Vec(-canvasWidth / 2 + 20, 0);
    this.leftPaddleVel = new Vec(0, 0);
    this.rightPaddlePos = new Vec(canvasWidth / 2 - 20, 0);
    this.rightPaddleOldPos = new Vec(canvasWidth / 2 - 20, 0);
    this.rightPaddleVel = new Vec(0, 0);
    this.ballPos = new Vec(0, 0);
    this.ballOldPos = new Vec(0, 0);
    const random = Math.random();
    this.ballVel =
      random > 0.7 ? new Vec(random, 1 - random) : new Vec(1 - random, random);
    isHard ? (this.ballSpeed = 4) : (this.ballSpeed = 2);
    this.paddleSpeed = 2;
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
const specialRoomIds: { id: string; isStart: boolean }[] = [];

// key: clientId, value: User
const users = {};

export function countAndRun(server: Server, room: Room) {
  // 게임 시작 counter 돌리자

  const score: GameScoreData = {
    leftScore: room.leftUserScore,
    rightScore: room.rightUserScore,
  };

  server.to(room.id).emit('updateScore', score);
  server.to(room.id).emit('count', { counter: '3' });
  setTimeout(() => {
    server.to(room.id).emit('count', { counter: '2' });
  }, 1000);
  setTimeout(() => {
    server.to(room.id).emit('count', { counter: '1' });
  }, 2000);
  setTimeout(() => {
    server.to(room.id).emit('count', '');
    room.isStart = true;
  }, 3000);
}

@WebSocketGateway(33000, {
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(
    private readonly recordService: RecordService,
    private readonly userService: UsersService,
    private readonly achievementService: AchievementService,
  ) {
    // request animation frame 추가.
    setInterval(() => {
      this.runGameEngine();
    }, 16);
  }
  // 유저 초기화
  handleConnection(client: any, ...args: any[]) {
    console.log('게임 소켓이 연결되었습니다. : ', client.id);
  }
  // 나가면 유저 지우기, 룸 지우기.
  handleDisconnect(client: any) {
    if (!client) throw new Error('Method not implemented.');
    const user = users[client.id] as User;
    if (!user) return;
    if (user.isPlayer) {
      this.server.to(user.roomId).emit('forceQuit');
      const room = rooms[user.roomId] as Room;
      if (room) {
        if (!(room.leftUserScore === 0 && room.rightUserScore === 0))
          this.recordService.createRecord(makeRecord(room, true));
        delete rooms[user.roomId];
      }
      commonRoomIds.forEach((commonRoomId, i) => {
        if (commonRoomId.id === user.roomId) {
          commonRoomIds.splice(i, 1);
          return;
        }
      });
    }
    this.userService.updateUserConnectionStatus(user.userId, 'CS0');
    delete users[client.id];
    console.log('게임소켓 연결이 끊겼습니다. : ', client.id);
  }
  @WebSocketServer()
  server: Server;

  gameStart(roomId: string) {
    setTimeout(() => {});
    this.server.to(roomId).emit('count3');
  }

  @SubscribeMessage('sendUserData')
  async sendUserData(client: any, { userId }: { userId: number }) {
    const userName = (await this.userService.findUserById(userId)).name;
    const user: User = {
      userId: userId,
      userName: userName,
      isLeft: true,
      isPlayer: false,
      roomId: '',
    };
    users[client.id] = user;
    this.userService.updateUserConnectionStatus(userId, 'CS1');
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
    if (!user) return;
    user.isPlayer = true;
    this.userService.updateUserConnectionStatus(user.userId, 'CS2');
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
            this.server.to(room.id).emit('waitingRoom', {
              roomId: room.id,
              rightName: room.rightUser.userName,
              leftName: room.leftUser.userName,
            });
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
          new GameData(payload.isHard),
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
      // 룸 만들고 넣고 watingRoom메시지 보내자. 그리고 상대한테 requestGame 메시지 날리자
      // 상대가 동의하면 gameData 조작해서 startGame 해버리자. 여기에서 처음에 방이 있는지 확인하는 로직을 넣어주자.
      // 없으면 룸 만들고 requestGame 날리고 아니면 말고
      // 상대가 동의하지 않으면 gameRefect 넣고 아니면 isStart하자.
      let isEmptyRoomExist = false;
      specialRoomIds.forEach((specialRoomId) => {
        if (!specialRoomId.isStart) {
          const room = rooms[specialRoomId.id] as Room;
          if (
            room &&
            room.isHard === payload.isHard &&
            room.isLadder === payload.isLadder &&
            room.leftUser.userId === payload.opponentUserId
          ) {
            room.rightUser = users[client.id];
            users[client.id].isLeft = false;
            users[client.id].roomId = room.id;
            specialRoomId.isStart = true;
            isEmptyRoomExist = true;
            client.join(room.id);
            this.server.to(room.id).emit('waitingRoom', {
              roomId: room.id,
              rightName: room.rightUser.userName,
              leftName: room.leftUser.userName,
            });
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
          new GameData(payload.isHard),
        );
        // 실제 방 생성.
        rooms[roomId] = room;
        room.leftUser = users[client.id];
        users[client.id].roomId = room.id;
        users[client.id].isLeft = true;
        specialRoomIds.push({ id: roomId, isStart: false });
        const userClientIds = Object.keys(users);
        userClientIds.forEach((userClientId) => {
          const user = users[userClientId] as User;
          if (user.userId === payload.opponentUserId) {
            this.server.to(userClientId).emit('requestGame', {
              roomId: room.id,
              opponentId: users[client.id].userId,
              userName: users[client.id].userName,
            });
            return;
          }
        });
      }
    }
  }
  @SubscribeMessage('acceptGame')
  acceptGame(client: any, { roomId }: { roomId: string }): any {
    const room = rooms[roomId] as Room;
    client.emit('waitingRoom', {
      roomId: room.id,
      rightName: room.rightUser.userName,
      leftName: room.leftUser.userName,
    });
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
      countAndRun(this.server, room);
    }
  }

  @SubscribeMessage('spectate')
  spectateGame(
    client: any,
    {
      onGameUserId,
    }: {
      onGameUserId: number;
    },
  ): any {
    const user = users[client.id] as User;
    this.userService.updateUserConnectionStatus(user.userId, 'CS3');
    // 신청한 사람을 찾자.
    const keys = Object.keys(users);
    keys.forEach((key) => {
      const user = users[key] as User;
      if (user.userId === onGameUserId) {
        const room = rooms[user.roomId] as Room;
        if (!room) return;
        client.join(user.roomId);
        this.server.to(user.roomId).emit('updateScore', {
          leftScore: room.leftUserScore,
          rightScore: room.rightUserScore,
        });
        this.server.to(user.roomId).emit('updateUserName', {
          leftName: room.leftUser.userName,
          rightName: room.rightUser.userName,
        });
        const me = users[client.id] as User;
        this.userService.updateUserConnectionStatus(me.userId, 'CS3');
        return;
      }
    });
  }

  // event 받기
  @SubscribeMessage('inputEvent')
  inputEvent(
    client: any,
    { controllData, roomId }: { controllData: ControllData; roomId: string },
  ): any {
    const room = rooms[roomId] as Room;
    if (!users[client.id] || !room) return;
    if (users[client.id].isPlayer) {
      if (users[client.id].isLeft) {
        room.gameData.paddleControll.leftPaddleControll = controllData;
      } else if (!users[client.id].isLeft) {
        room.gameData.paddleControll.rightPaddleControll = controllData;
      }
    }
  }
  runGameEngine() {
    const roomIds = Object.keys(rooms);
    roomIds.forEach((roomId) => {
      gameEngine(
        rooms[roomId],
        this.server,
        this.recordService,
        this.achievementService,
      );
    });
  }
}
