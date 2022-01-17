import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import GameExit from './GameExit';
import {GameData} from './GameData';
import {GameScene} from './GameScene';

interface startGamePayload {
  isRandomMatch: boolean;
  opponentUserId: number;
  isHard: boolean;
  isLadder: boolean;
  userId: number;
}

interface GameScoreData {
  leftScore: number;
  rightScore: number;
}

enum ControllData {
  up,
  down,
  nothing,
}

enum StartState {
  waiting,
  ready,
  run,
  done,
  quit,
  spectating,
}

// 여기서 프론트 게임을 다 구현해보자.
export default function Game(): JSX.Element {
  const history = useHistory();
  const [startState, setStartState] = useState<StartState>(StartState.waiting);
  const [score, setScore] = useState<GameScoreData>({
    leftScore: 0,
    rightScore: 0,
  });
  const [counter, setCounter] = useState('');

  useEffect(() => {
    const edge: number = Math.min(window.innerWidth, window.innerHeight);

    const gameScene = new GameScene(edge, GameData.socket);
    // 게임 신청
    const payload: startGamePayload = {
      isRandomMatch: true,
      opponentUserId: 0,
      isHard: GameData.isHard,
      isLadder: GameData.isLadder,
      userId: GameData.id,
    };
    if (!GameData.socket) history.push('/home');
    if (GameData.socket) {
      GameData.socket.emit('startGame', payload);
      GameData.socket.on('forceQuit', () => {
        setStartState(StartState.quit);
      });
      GameData.socket.on('count', (counter: string) => {
        setCounter(counter);
      });
      GameData.socket.on('gameOver', (gameScoreData: GameScoreData) => {
        setScore(gameScoreData);
      });

      GameData.socket.on('rendering', gamePositionData => {
        // console.log(gamePositionData.ballPos.x, gamePositionData.ballPos.y);
        gameScene.setBallPos(
          gamePositionData.ballPos.x,
          gamePositionData.ballPos.y,
        );
        gameScene.setLPaddlePos(gamePositionData.leftPaddlePos.y);
        gameScene.setRPaddlePos(gamePositionData.rightPaddlePos.y);
      });

      // socket io 메시지 받는곳
      GameData.socket.on('waitingRoom', ({roomId}: {roomId: string}) => {
        GameData.setRoomId(roomId);
        setStartState(StartState.ready);

        // 키 세팅
        const keydownEvent = (e: KeyboardEvent) => {
          let controllData = ControllData.nothing;
          if (e.key === 'ArrowUp') {
            controllData = ControllData.up;
          } else if (e.key === 'ArrowDown') {
            controllData = ControllData.down;
          }
          GameData.socket.emit('inputEvent', {
            controllData: controllData,
            roomId: GameData.roomId,
          });
        };
        const keyupEvent = (e: KeyboardEvent) => {
          const controllData = ControllData.nothing;
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            GameData.socket.emit('inputEvent', {
              controllData: controllData,
              roomId: GameData.roomId,
            });
          }
        };

        addEventListener('keydown', keydownEvent);
        addEventListener('keyup', keyupEvent);
      });
    }
  }, []);

  const onReadyClick = () => {
    setStartState(StartState.waiting);
    GameData.socket.emit('ready', {roomId: GameData.roomId});
  };
  // 소켓 연결이 끊어지나??
  const onExit = () => {
    history.push('/home');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GameExit onExitClick={onExit} />
      <div style={{color: 'white'}}>
        {score.leftScore} : {score.rightScore}
      </div>
      <button onClick={onReadyClick} hidden={startState !== StartState.ready}>
        Ready
      </button>
      <h2 style={{color: 'white'}}>{counter}</h2>
      <canvas
        id="pixi-canvas"
        style={{
          position: 'absolute',
          top: '0',
          zIndex: -10,
        }}
      ></canvas>
    </div>
  );
}

// const GameDiv = styled.div`
// `;
