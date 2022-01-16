import { VerifyCallback } from 'passport-oauth2';
import { Server } from 'socket.io';
import { Room, Vec, Pos, ControllData, GameData } from './game.gateway';

const paddleWidth = 30;
const paddleHeight = 100;
const ballWidth = 30;
const ballHeight = 30;
export const canvasWidth = 800;
export const canvasHeight = 600;
const timePerFrame = 10;

enum WallCollisionCheck {
  leftCollision,
  rightCollision,
  topCollision,
  bottomCollision,
  notCollision,
}

interface GamePositionData {
  leftPaddlePos: Pos;
  rightPaddlePos: Pos;
  ballPos: Pos;
}

interface GameScoreData {
  leftScore: number;
  rightScore: number;
}

// 벡터 연산 함수..

function reflectObj(nomalVec: Vec, objVel: Vec): Vec {
  // 주의 계산이 잘못될수도 있다.
  // R = P + 2n(-P(dot)n)
  return nomalVec
    .vecMult(2)
    .vecMult(nomalVec.vecDot(objVel.vecMult(-1)))
    .vecAdd(objVel);
}

function checkPaddleCollision(paddlePos: Pos, obj: Pos): boolean {
  if (
    paddlePos.x + paddleWidth / 2 >= obj.x - ballWidth / 2 &&
    paddlePos.x - paddleWidth / 2 <= obj.x + ballWidth / 2 &&
    paddlePos.y + paddleHeight / 2 >= obj.y - ballHeight / 2 &&
    paddlePos.y - paddleHeight / 2 <= obj.y + ballHeight / 2
  ) {
    return true;
  } else return false;
}

function checkWallCollision(ballPos: Pos): WallCollisionCheck {
  if (ballPos.x - ballWidth / 2 <= 0) return WallCollisionCheck.leftCollision;
  else if (ballPos.x + ballWidth / 2 >= canvasWidth)
    return WallCollisionCheck.rightCollision;
  else if (ballPos.y + ballHeight / 2 >= canvasHeight)
    return WallCollisionCheck.topCollision;
  else if (ballPos.y - ballHeight / 2 <= 0)
    return WallCollisionCheck.bottomCollision;
  else return WallCollisionCheck.notCollision;
}

function gameController(gameData: GameData) {
  if (
    gameData.paddleControll.oldLeftPaddleControll !==
    gameData.paddleControll.leftPaddleControll
  ) {
    switch (gameData.paddleControll.leftPaddleControll) {
      case ControllData.up: {
        gameData.leftPaddleVel.y = -gameData.paddleSpeed;
        break;
      }
      case ControllData.down: {
        gameData.leftPaddleVel.y = gameData.paddleSpeed;
        break;
      }
      case ControllData.nothing: {
        gameData.leftPaddleVel.y = 0;
        break;
      }
    }
  }
  if (
    gameData.paddleControll.oldRightPaddleControll !==
    gameData.paddleControll.rightPaddleControll
  ) {
    switch (gameData.paddleControll.rightPaddleControll) {
      case ControllData.up: {
        gameData.rightPaddleVel.y = -gameData.paddleSpeed;
        break;
      }
      case ControllData.down: {
        gameData.rightPaddleVel.y = gameData.paddleSpeed;
        break;
      }
      case ControllData.nothing: {
        gameData.rightPaddleVel.y = 0;
        break;
      }
    }
  }
}

// 이벤트는 밖에서 받고 room을 업데이트 해준다.
// 이 친구는 socket연결되어 있는 친구들에게 그릴 데이터를 보내주기만 한다.
// 게임 종료는 밖에서 확인한다.
// 이 친구는 오직 게임이 돌아가는 충돌처리만 담당한다.
function gameEngine(room: Room, server: Server) {
  const gameData = room.gameData;
  gameController(gameData);
  if (!room.isStart) return;
  // 벽 공 충돌 확인.
  const isWallBallCollide = checkWallCollision(gameData.ballPos);
  if (isWallBallCollide === WallCollisionCheck.leftCollision) {
    console.log('오른쪽 승');
    room.rightUserScore++;
    room.isStart = false;
    const score: GameScoreData = {
      leftScore: room.leftUserScore,
      rightScore: room.rightUserScore,
    };
    server.to(room.id).emit('gameOver', score);
  } else if (isWallBallCollide === WallCollisionCheck.rightCollision) {
    console.log('왼쪽 승');
    room.leftUserScore++;
    room.isStart = false;
    const score: GameScoreData = {
      leftScore: room.leftUserScore,
      rightScore: room.rightUserScore,
    };
    server.to(room.id).emit('gameOver', score);
  } else if (isWallBallCollide === WallCollisionCheck.topCollision) {
    console.log('위쪽 충돌');
    gameData.ballVel = reflectObj(new Vec(0, 1), gameData.ballVel);
    gameData.ballPos = gameData.ballOldPos;
  } else if (isWallBallCollide === WallCollisionCheck.bottomCollision) {
    console.log('아래쪽 충돌');
    gameData.ballVel = reflectObj(new Vec(0, -1), gameData.ballVel);
    gameData.ballPos = gameData.ballOldPos;
  }

  // 벽 패들 충돌 확인. 충돌시 더 못가게 막기.
  const isWallLeftPaddleCollide = checkWallCollision(gameData.leftPaddlePos);
  const isWallRightPaddleCollide = checkWallCollision(gameData.rightPaddlePos);
  if (isWallLeftPaddleCollide) {
    gameData.leftPaddlePos = gameData.leftPaddleOldPos;
  }
  if (isWallRightPaddleCollide) {
    gameData.rightPaddlePos = gameData.rightPaddleOldPos;
  }

  // 공 패들 충돌 확인.
  const isBallLeftPaddleCollide = checkPaddleCollision(
    gameData.leftPaddlePos,
    gameData.ballPos,
  );
  const isBallRightPaddleCollide = checkPaddleCollision(
    gameData.rightPaddlePos,
    gameData.ballPos,
  );
  if (isBallLeftPaddleCollide) {
    gameData.ballVel = reflectObj(new Vec(1, 0), gameData.ballVel);
    gameData.ballSpeed += 1;
  } else if (isBallRightPaddleCollide) {
    gameData.ballVel = reflectObj(new Vec(-1, 0), gameData.ballVel);
    gameData.ballSpeed += 1;
  }

  // 공 이동
  gameData.ballOldPos = gameData.ballPos;
  gameData.ballPos = gameData.ballVel
    .vecMult(timePerFrame)
    .vecAdd(gameData.ballPos)
    .vecMult(gameData.ballSpeed);
  // 왼쪽 패들 움직임.
  gameData.leftPaddleOldPos = gameData.leftPaddlePos;
  gameData.leftPaddlePos = gameData.leftPaddleVel
    .vecMult(timePerFrame)
    .vecAdd(gameData.leftPaddlePos)
    .vecMult(gameData.paddleSpeed);
  // 오른쪽 패들 움직임.
  gameData.rightPaddleOldPos = gameData.rightPaddlePos;
  gameData.rightPaddlePos = gameData.rightPaddleVel
    .vecMult(timePerFrame)
    .vecAdd(gameData.rightPaddlePos)
    .vecMult(gameData.paddleSpeed);

  // gameData 보내기.
  const gamePositionData: GamePositionData = {
    leftPaddlePos: gameData.leftPaddlePos,
    rightPaddlePos: gameData.rightPaddlePos,
    ballPos: gameData.ballPos,
  };
  server.to(room.id).emit('rendering', gamePositionData);
}
