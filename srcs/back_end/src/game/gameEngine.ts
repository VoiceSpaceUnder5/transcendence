import { Server } from 'socket.io';
import { CreateRecordInput } from 'src/record/dto/create-record.input';
import { RecordService } from 'src/record/record.service';
import { AchievementService } from 'src/achievement/achievement.service';
import { CreateAchievementInput } from 'src/achievement/dto/create-achievement.input';
import {
  Room,
  Vec,
  Pos,
  ControllData,
  GameData,
  countAndRun,
} from './game.gateway';

const winnerScore = 3;
const paddleWidth = 20;
const paddleHeight = 100;
const ballWidth = 30;
const ballHeight = 30;
export const canvasWidth = 600;
export const canvasHeight = 600;
const timePerFrame = 2;
const maxBallSpeed = 30;
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

export interface GameScoreData {
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

function checkPaddleCollision(
  paddlePos: Pos,
  obj: Pos,
  ballVel: Vec,
  isLeft: boolean,
): boolean {
  if ((isLeft && ballVel.x > 0) || (!isLeft && ballVel.x < 0)) {
    return false;
  }
  if (
    paddlePos.y + paddleHeight / 2 >= obj.y - ballHeight / 2 &&
    paddlePos.y - paddleHeight / 2 <= obj.y + ballHeight / 2
  ) {
    if (isLeft) {
      if (paddlePos.x + paddleWidth / 2 >= obj.x - ballWidth / 2) return true;
    } else {
      if (paddlePos.x - paddleWidth / 2 <= obj.x + ballWidth / 2) return true;
    }
  } else return false;
}

export function makeRecord(
  room: Room,
  isCanceled: boolean = false,
): CreateRecordInput {
  const record = new CreateRecordInput();
  record.leftUserId = room.leftUser.userId;
  record.rightUserId = room.rightUser.userId;
  record.modeId = room.isHard ? 'BM1' : 'BM0';
  record.typeId = room.isLadder ? 'BT1' : 'BT0';
  record.leftUserScore = room.leftUserScore;
  record.rightUserScore = room.rightUserScore;
  if (isCanceled) record.resultId = 'BR3';
  else if (room.leftUserScore >= winnerScore) record.resultId = 'BR0';
  else if (room.rightUserScore >= winnerScore) record.resultId = 'BR1';

  return record;
}

// function checkPaddleCollision(paddlePos: Pos, obj: Pos, vel: Vec): boolean {
//   if (
//     paddlePos.x + paddleWidth / 2 >= obj.x - ballWidth / 2
//   ) {
//     return true;
//   } else if (paddlePos.x - paddleWidth / 2 <= obj.x + ballWidth / 2 &&) {
//     // paddlePos.y + paddleHeight / 2 >= obj.y - ballHeight / 2 &&
//     // paddlePos.y - paddleHeight / 2 <= obj.y + ballHeight / 2
//   } else {
//     return false;
//   }
// }

function checkWallCollision(
  objPos: Pos,
  isPaddle: boolean,
): WallCollisionCheck {
  const objWidth = isPaddle ? paddleWidth : ballWidth;
  const objHeight = isPaddle ? paddleHeight : ballHeight;
  if (objPos.x - objWidth / 2 <= -(canvasWidth / 2))
    return WallCollisionCheck.leftCollision;
  else if (objPos.x + objWidth / 2 >= canvasWidth / 2)
    return WallCollisionCheck.rightCollision;
  else if (objPos.y + objHeight / 2 >= canvasHeight / 2)
    return WallCollisionCheck.topCollision;
  else if (objPos.y - objHeight / 2 <= -(canvasHeight / 2))
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
    gameData.paddleControll.oldLeftPaddleControll =
      gameData.paddleControll.leftPaddleControll;
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
    gameData.paddleControll.oldRightPaddleControll =
      gameData.paddleControll.rightPaddleControll;
  }
}

// 게임 승리.
async function winTheGame(
  room: Room,
  server: Server,
  isWinnerLeft: boolean,
  recordService: RecordService,
  achievementService: AchievementService,
) {
  isWinnerLeft ? room.leftUserScore++ : room.rightUserScore++;
  room.isStart = false;
  const score: GameScoreData = {
    leftScore: room.leftUserScore,
    rightScore: room.rightUserScore,
  };
  if (room.rightUserScore < winnerScore && room.leftUserScore < winnerScore) {
    server.to(room.id).emit('gameOver', score);
    countAndRun(server, room);
  } else {
    server.to(room.id).emit('done', score);

    room.leftUserReady = false;
    room.rightUserReady = false;
    const record = makeRecord(room);
    recordService.createRecord(record);
    const winnerAchievement = new CreateAchievementInput();
    const loserAchievement = new CreateAchievementInput();
    // AT1 첫승 AT2 첫패

    winnerAchievement.typeId = 'AT1';
    loserAchievement.typeId = 'AT2';
    if (record.resultId === 'BR0') {
      winnerAchievement.userId = room.leftUser.userId;
      loserAchievement.userId = room.rightUser.userId;
      try {
        await achievementService.createAchievement(winnerAchievement);
        await achievementService.createAchievement(loserAchievement);
      } catch (e) {
        // console.log(e);
        console.log('중복된 업적');
      }
    } else if (record.resultId === 'BR1') {
      winnerAchievement.userId = room.rightUser.userId;
      loserAchievement.userId = room.leftUser.userId;
      try {
        await achievementService.createAchievement(loserAchievement);
        await achievementService.createAchievement(winnerAchievement);
      } catch (e) {
        console.log('중복된 업적');
        // console.log(e);
      }
    }

    // console.log(winnerAchievement);
    // console.log(loserAchievement);
    room.leftUserScore = 0;
    room.rightUserScore = 0;
  }
  room.gameData.reset(room.isHard);
}

// 이벤트는 밖에서 받고 room을 업데이트 해준다.
// 이 친구는 socket연결되어 있는 친구들에게 그릴 데이터를 보내주기만 한다.
// 게임 종료는 밖에서 확인한다.
// 이 친구는 오직 게임이 돌아가는 충돌처리만 담당한다.

// velocity
export default function gameEngine(
  room: Room,
  server: Server,
  recordService: RecordService,
  achievementService: AchievementService,
) {
  if (!room) return;
  const gameData = room.gameData;
  gameController(gameData);
  if (!room.isStart) return;
  // 벽 공 충돌 확인.
  const isWallBallCollide = checkWallCollision(gameData.ballPos, false);
  if (isWallBallCollide === WallCollisionCheck.topCollision) {
    gameData.ballVel = reflectObj(new Vec(0, 1), gameData.ballVel);
    gameData.ballPos = gameData.ballOldPos;
  } else if (isWallBallCollide === WallCollisionCheck.bottomCollision) {
    gameData.ballVel = reflectObj(new Vec(0, -1), gameData.ballVel);
    gameData.ballPos = gameData.ballOldPos;
  }

  // 벽 패들 충돌 확인. 충돌시 더 못가게 막기.
  const isWallLeftPaddleCollide = checkWallCollision(
    gameData.leftPaddlePos,
    true,
  );
  const isWallRightPaddleCollide = checkWallCollision(
    gameData.rightPaddlePos,
    true,
  );
  if (
    isWallLeftPaddleCollide === WallCollisionCheck.topCollision ||
    isWallLeftPaddleCollide === WallCollisionCheck.bottomCollision
  ) {
    gameData.leftPaddlePos = gameData.leftPaddleOldPos;
  }
  if (
    isWallRightPaddleCollide === WallCollisionCheck.topCollision ||
    isWallRightPaddleCollide === WallCollisionCheck.bottomCollision
  ) {
    gameData.rightPaddlePos = gameData.rightPaddleOldPos;
  }
  // 공 패들 충돌 확인.

  const isBallLeftPaddleCollide = checkPaddleCollision(
    gameData.leftPaddlePos,
    gameData.ballPos,
    gameData.ballVel,
    true,
  );
  const isBallRightPaddleCollide = checkPaddleCollision(
    gameData.rightPaddlePos,
    gameData.ballPos,
    gameData.ballVel,
    false,
  );
  if (isBallLeftPaddleCollide) {
    gameData.ballVel = reflectObj(new Vec(1, 0), gameData.ballVel);
    if (gameData.leftPaddleOldPos.y < gameData.leftPaddlePos.y) {
      gameData.ballVel.y += 0.25;
    } else if (gameData.leftPaddleOldPos.y > gameData.leftPaddlePos.y) {
      gameData.ballVel.y -= 0.25;
    }
    if (gameData.ballSpeed <= maxBallSpeed) {
      gameData.ballSpeed += 0.25;
    }
  } else if (isBallRightPaddleCollide) {
    gameData.ballVel = reflectObj(new Vec(-1, 0), gameData.ballVel);
    if (gameData.rightPaddleOldPos.y < gameData.rightPaddlePos.y) {
      gameData.ballVel.y += 1;
    } else if (gameData.rightPaddleOldPos.y > gameData.rightPaddlePos.y) {
      gameData.ballVel.y -= 1;
    }
    if (gameData.ballSpeed <= maxBallSpeed) {
      gameData.ballSpeed += 0.5;
    }
    // 승리 판단
  } else if (isWallBallCollide === WallCollisionCheck.leftCollision) {
    winTheGame(room, server, false, recordService, achievementService);
    return;
  } else if (isWallBallCollide === WallCollisionCheck.rightCollision) {
    winTheGame(room, server, true, recordService, achievementService);
    return;
  }

  // 공 이동
  gameData.ballOldPos = gameData.ballPos;
  gameData.ballPos = gameData.ballVel
    .vecMult(timePerFrame)
    .vecMult(gameData.ballSpeed)
    .vecAdd(gameData.ballPos);
  // 왼쪽 패들 움직임.
  gameData.leftPaddleOldPos = gameData.leftPaddlePos;
  gameData.leftPaddlePos = gameData.leftPaddleVel
    .vecMult(timePerFrame)
    .vecMult(gameData.paddleSpeed)
    .vecAdd(gameData.leftPaddlePos);
  // 오른쪽 패들 움직임.
  gameData.rightPaddleOldPos = gameData.rightPaddlePos;
  gameData.rightPaddlePos = gameData.rightPaddleVel
    .vecMult(timePerFrame)
    .vecMult(gameData.paddleSpeed)
    .vecAdd(gameData.rightPaddlePos);

  // gameData 보내기.
  const gamePositionData: GamePositionData = {
    leftPaddlePos: gameData.leftPaddlePos,
    rightPaddlePos: gameData.rightPaddlePos,
    ballPos: gameData.ballPos,
  };
  server.to(room.id).emit('rendering', gamePositionData);
}
