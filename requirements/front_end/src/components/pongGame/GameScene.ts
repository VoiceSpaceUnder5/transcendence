import Phaser from 'phaser';
import {Socket} from 'socket.io-client';
import {GameData} from './GameData';

const PADDLE_SPEED = 700;

interface PaddleInfo {
  pos: {
    x: number;
    y: number;
  };
  isLeft: boolean;
}
interface BallInfo {
  pos: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
}

export class GameScene extends Phaser.Scene {
  private myPaddle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null =
    null;
  private enemyPaddle: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null =
    null;
  private ball: Phaser.Physics.Arcade.Image | null = null;
  private myWall: Phaser.Types.Physics.Arcade.ImageWithStaticBody | null = null;
  private enemyWall: Phaser.Types.Physics.Arcade.ImageWithStaticBody | null =
    null;

  private upKey1: Phaser.Input.Keyboard.Key | null = null;
  private downKey1: Phaser.Input.Keyboard.Key | null = null;

  private socket: Socket | null = null;
  private oldPos = {x: 0, y: 0};
  private isLeft: boolean | null = null;
  private isStart: boolean | null = null;
  private roomId: number | null = null;
  private restartButton: Phaser.GameObjects.Image | null = null;
  private startButton: Phaser.GameObjects.Image | null = null;

  constructor() {
    super({key: 'game', active: true});
  }

  preload(): void {
    this.load.image('me', '/paddle.png');
    this.load.image('enemy', '/paddle2.png');
    this.load.image('ball', '/ball.png');
    this.load.image('myWall', '/wall.png');
    this.load.image('enemyWall', '/wall2.png');
    this.load.image('startButton', '/startButton.png');
    this.load.image('restartButton', '/restartButton.png');
  }

  create(): void {
    // 소켓 연결 부분
    // this.socket = io('http://api.ts.io:30000');
    this.socket = GameData.socket;
    this.socket.emit('startGame', {
      isHard: GameData.isHard,
      isLadder: GameData.isLadder,
    });

    // 버튼 세팅
    this.startButton = this.add.image(400, 300, 'startButton').setInteractive();
    this.restartButton = this.add
      .image(400, 300, 'restartButton')
      .setInteractive();
    this.startButton.on('pointerdown', () => {
      this.socket?.emit('ready', {roomId: this.roomId});
      this.startButton?.disableInteractive();
      this.startButton?.setVisible(false);
    });
    this.restartButton.on('pointerdown', () => {
      this.socket?.emit('restart', {roomId: this.roomId});
      this.restartButton?.disableInteractive();
      this.restartButton?.setVisible(false);
    });
    this.restartButton.disableInteractive();
    this.restartButton.setVisible(false);
    this.startButton.disableInteractive();
    this.startButton.setVisible(false);

    // 모두 멈춰라!
    const everyBodyStop = () => {
      this.myPaddle?.setVelocity(0, 0);
      this.enemyPaddle?.setVelocity(0, 0);
      this.ball?.setVelocity(0, 0);
    };

    // // 시작 세팅
    // const reStart = (ballVel: {x: number; y: number}) => {
    //   if (this.isLeft) {
    //     this.myPaddle?.enableBody(true, 100, 400, true, true);
    //     this.enemyPaddle?.enableBody(true, 700, 400, true, true);
    //     this.myWall?.enableBody(true, 20, 300, true, true);
    //     this.enemyWall?.enableBody(true, 780, 300, true, true);
    //   } else {
    //     this.myPaddle?.enableBody(true, 700, 400, true, true);
    //     this.enemyPaddle?.enableBody(true, 100, 400, true, true);
    //     this.myWall?.enableBody(true, 780, 300, true, true);
    //     this.enemyWall?.enableBody(true, 20, 300, true, true);
    //   }
    // };

    this.socket.on('allIn', () => {
      this.startButton?.setVisible(true);
      this.startButton?.setInteractive();
    });
    this.socket.on('waitingGame', payload => {
      this.isLeft = payload.isLeft;
      this.roomId = payload.roomId;
      GameData.setRoomId(payload.roomId);
      GameData.setIsHard(payload.isHard);
    });
    this.socket.on('movedOtherPaddle', (payload: PaddleInfo) => {
      if (this.isLeft !== payload.isLeft)
        this.enemyPaddle?.setPosition(payload.pos.x, payload.pos.y);
    });
    this.socket.on('updateBall', (payload: BallInfo) => {
      this.ball?.setX(payload.pos.x);
      this.ball?.setY(payload.pos.y);
      this.ball?.setVelocityX(payload.velocity.x);
      this.ball?.setVelocityY(payload.velocity.y);
    });
    this.socket.on('win', ({isWinnerLeft}) => {
      everyBodyStop();

      if (isWinnerLeft) console.log('왼쪽이 이겼지렁~~~!');
      else console.log('오른쪽이 이겼지렁~~~!');
      this.restartButton?.setVisible(true);
      this.restartButton?.setInteractive();
    });
    this.socket.on('forceQuit', () => {
      this.add.text(315, 80, '상대방이 게임을 종료하였습니다.');
      everyBodyStop();
      this.socket?.disconnect();
    });
    this.socket.on('restartGame', () => {
      console.log('restart');
      this.myPaddle?.setPosition(this.myPaddle.body.position.x, 300);
      this.enemyPaddle?.setPosition(this.enemyPaddle.body.position.x, 300);
      this.ball?.setPosition(200, 150);
      this.ball?.setVelocity(500, 500);
    });
    // this.socket.on('exitedGame', () => {
    //   this.socket?.emit('exit', {roomId: this.roomId});
    //   this.add.text(315, 80, '상대방이 종료하였습니다.');
    //   everyBodyStop();
    //   this.socket?.disconnect();
    // });
    // 여기가 진짜 시작하는 부분. 처음 세팅이라고 생각하자.
    this.socket.on('matchGame', () => {
      // 내 paddle이 왼쪽인지 오른쪽인지 판단하고 오브젝트를 세팅하는 부분.
      if (this.isLeft) {
        this.myPaddle = this.physics.add.image(100, 300, 'me');
        this.enemyPaddle = this.physics.add.image(700, 300, 'enemy');
        this.myWall = this.physics.add.staticImage(20, 300, 'myWall');
        this.enemyWall = this.physics.add.staticImage(780, 300, 'enemyWall');
      } else {
        this.myPaddle = this.physics.add.image(700, 300, 'me');
        this.enemyPaddle = this.physics.add.image(100, 300, 'enemy');
        this.myWall = this.physics.add.staticImage(780, 300, 'myWall');
        this.enemyWall = this.physics.add.staticImage(20, 300, 'enemyWall');
      }
      // 모드 세팅
      if (GameData.isHard) this.add.text(600, 20, 'Hard');
      else this.add.text(600, 80, 'Normal');
      if (GameData.isLadder) this.add.text(600, 40, 'Ladder');

      // 시작
      this.isStart = true;
      // 초기 오브젝트 세팅
      // 패들 세팅
      this.myPaddle.setCollideWorldBounds(true);
      this.myPaddle.setImmovable();
      this.enemyPaddle.setCollideWorldBounds(true);
      this.enemyPaddle.setImmovable();

      // 공 세팅
      this.ball = this.physics.add.image(200, 150, 'ball');
      this.ball.setGravity(0, 0);
      this.ball.setCollideWorldBounds(true);
      this.ball.setBounce(1);
      this.ball.setVelocity(500, 500);

      // 상대 벽과 충돌 처리
      this.physics.add.collider(this.ball, this.enemyWall);

      // 상대 paddle과 공과의 충돌 처리
      if (this.enemyPaddle)
        this.physics.add.collider(this.enemyPaddle, this.ball);

      // 공, 내 패들이랑 충돌 콜백
      const hitMyPaddle = () => {
        if (!this.ball) return;
        const ballInfo: BallInfo = {
          pos: {
            x: this.ball.x,
            y: this.ball.y,
          },
          velocity: {
            x: this.ball.body.velocity.x,
            y: this.ball.body.velocity.y,
          },
        };
        this.socket?.emit('hitBall', {
          ballInfo: ballInfo,
          roomId: this.roomId,
        });
      };
      // 공, 내 골대 충돌 콜백
      const goalMyGoalPost = () => {
        if (!this.ball) return;
        // 여기에서 점수 조작하면 된다. gql을 쓰던 socket을 쓰던
        // 내 골대에 공이 들어 가면 실행된다.
        everyBodyStop();
        console.log('내 골대에 닿음.');
        this.isStart = false;
        this.socket?.emit('lose', {
          id: GameData.id,
          roomId: GameData.roomId,
          isLeft: this.isLeft,
        });
        this.restartButton?.setVisible(true);
        this.restartButton?.setInteractive();
      };

      // 충돌시 콜백 부르기.
      // 공, 패들 충돌
      this.physics.add.collider(this.myPaddle, this.ball).collideCallback =
        hitMyPaddle;
      // 공, 내 골대
      this.physics.add.collider(this.ball, this.myWall).collideCallback =
        goalMyGoalPost;
    });

    // 키 추가
    this.upKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey1 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
    );

    // destroy 이벤트 잡기.
    this.sys.scene.events.on('destroy', () => {
      this.socket?.emit('exitGame', {roomId: this.roomId});
      this.socket?.disconnect();
    });

    // // 브라우저가 종료되거나 새로고침 되었을 때
    // window.addEventListener('beforeunload', e => {
    //   this.socket!.emit('exitGame', {roomId: this.roomId});
    //   this.socket?.disconnect();
    //   this.game.destroy(true);
    // });
  }
  // 루프
  update(): void {
    // 시작을 해야 동작함.
    if (this.isStart && this.myPaddle) {
      if (this.downKey1?.isDown) this.myPaddle.setVelocityY(PADDLE_SPEED);
      else if (this.upKey1?.isDown) this.myPaddle.setVelocityY(-PADDLE_SPEED);
      else this.myPaddle.setVelocityY(0);

      // 움직이면 내 paddle 위치 emit
      if (
        this.myPaddle.x !== this.oldPos.x ||
        this.myPaddle.y !== this.oldPos.y
      ) {
        const payload = {
          pos: {
            x: this.myPaddle.x,
            y: this.myPaddle.y,
          },
          isLeft: this.isLeft,
          roomId: this.roomId,
        };
        this.socket?.emit('paddleMoving', payload);
      }
    }
    // 과거 위치와 현재위치 비교해서 안움직였으면 최대한 socket 메세지 안날리게 하려고 넣음.
    if (this.myPaddle) this.oldPos = {x: this.myPaddle.x, y: this.myPaddle.y};
  }
}
