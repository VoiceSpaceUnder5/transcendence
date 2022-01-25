import * as PIXI from 'pixi.js';
import {Socket} from 'socket.io-client';

export class GameScene {
  private edge: number;
  private socket: Socket;
  private app: PIXI.Application;
  public ball: PIXI.Graphics;
  private radius: number;
  public lPaddle: PIXI.Graphics;
  public rPaddle: PIXI.Graphics;
  private isLeft: boolean | undefined = undefined;

  constructor(edge: number, socket: Socket) {
    this.edge = edge;
    this.socket = socket;

    this.app = new PIXI.Application({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      backgroundColor: 0x000000,
      width: edge,
      height: edge,
      antialias: true,
    });

    const paddleX = (edge * 20) / 600;
    const paddleY = (edge * 100) / 600;

    // 왼쪽 패들
    this.lPaddle = new PIXI.Graphics();
    this.lPaddle.beginFill(0xff0000);
    this.lPaddle.drawRect(10, (edge - paddleY) / 2, paddleX, paddleY);
    this.lPaddle.endFill();

    // 오른쪽 패들
    this.rPaddle = new PIXI.Graphics();
    this.rPaddle.beginFill(0x0000ff);
    this.rPaddle.drawRect(
      edge - paddleX - 10,
      (edge - paddleY) / 2,
      paddleX,
      paddleY,
    );
    this.rPaddle.endFill();

    // 반지름: edge가 600일 때 10이 기준
    const radius = (edge * 10) / 600;
    this.radius = radius;
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xffffff);
    this.ball.drawCircle(edge / 2, edge / 2, radius);
    this.ball.endFill();

    // app에 붙이기
    this.app.stage.addChild(this.ball);
    this.app.stage.addChild(this.lPaddle);
    this.app.stage.addChild(this.rPaddle);
  }

  // gameStart() {}

  getRadius(): number {
    return this.radius;
  }

  setPlayerPos(playerPos: string): void {
    console.log(playerPos);
    if (playerPos === 'left') {
      this.isLeft = true;
    } else {
      this.isLeft = false;
    }
  }

  setBallPos(x: number, y: number): void {
    this.ball.x = (x * this.edge) / 600;
    this.ball.y = (y * this.edge) / 600;
  }

  setLPaddlePos(y: number): void {
    this.lPaddle.y = (y * this.edge) / 600;
  }

  setRPaddlePos(y: number): void {
    this.rPaddle.y = (y * this.edge) / 600;
  }

  paddleUp(): void {
    this.socket.emit('upPaddle', {
      playerIsLeft: this.isLeft,
    });
  }

  paddleDown(): void {
    this.socket.emit('downPaddle', {
      playerIsLeft: this.isLeft,
    });
  }

  keyUp(): void {
    this.socket.emit('keyUp', {
      playerIsLeft: this.isLeft,
    });
  }
}
