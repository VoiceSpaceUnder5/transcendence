import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import GameExit from './GameExit';
import {GameData} from './GameData';
import {GameScene} from './GameScene';

export interface StartGamePayload {
  isRandomMatch: boolean;
  opponentUserId: number;
  isHard: boolean;
  isLadder: boolean;
  userId: number;
  roomId: string;
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
  const [userNames, setUserNames] = useState({rightName: '', leftName: ''});
  const [counter, setCounter] = useState('');

  useEffect(() => {
    const edge: number = Math.min(window.innerWidth, window.innerHeight);

    const gameScene = new GameScene(edge, GameData.socket);
    // 게임 신청
    const payload: StartGamePayload = {
      isRandomMatch: GameData.isRandomMatch,
      opponentUserId: GameData.onGameUserId,
      isHard: GameData.isHard,
      isLadder: GameData.isLadder,
      userId: GameData.id,
      roomId: GameData.roomId,
    };
    if (!GameData.socket) history.push('/home');
    if (GameData.socket) {
      GameData.socket.emit('startGame', payload);
      GameData.socket.on('forceQuit', () => {
        setStartState(StartState.quit);
      });
      GameData.socket.on('count', ({counter}: {counter: string}) => {
        setCounter(counter);
        setStartState(StartState.run);
      });
      GameData.socket.on('updateScore', (gameScoreData: GameScoreData) => {
        setScore(gameScoreData);
      });
      GameData.socket.on('gameOver', (gameScoreData: GameScoreData) => {
        setScore(gameScoreData);
      });
      GameData.socket.on('done', (gameScoreData: GameScoreData) => {
        setScore(gameScoreData);
        setStartState(StartState.done);
      });
      GameData.socket.on('forceQuit', () => {
        setStartState(StartState.quit);
      });
      GameData.socket.on('rendering', gamePositionData => {
        gameScene.setBallPos(
          gamePositionData.ballPos.x,
          gamePositionData.ballPos.y,
        );
        gameScene.setLPaddlePos(gamePositionData.leftPaddlePos.y);
        gameScene.setRPaddlePos(gamePositionData.rightPaddlePos.y);
      });
      GameData.socket.on(
        'waitingRoom',
        ({
          roomId,
          rightName,
          leftName,
        }: {
          roomId: string;
          rightName: string;
          leftName: string;
        }) => {
          GameData.setRoomId(roomId);
          setStartState(StartState.ready);
          setUserNames({rightName: rightName, leftName: leftName});

          // 키 세팅

          addEventListener('keydown', keydownEvent);
          addEventListener('keyup', keyupEvent);
        },
      );
    }
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
    return () => {
      removeEventListener('keydown', keydownEvent);
      removeEventListener('keyup', keyupEvent);
    };
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          color: 'white',
          justifyContent: 'space-around',
        }}
      >
        {userNames.leftName}
        <GameExit onExitClick={onExit} />
        {userNames.rightName}
      </div>
      <div style={{color: 'white'}}>
        {score.leftScore} : {score.rightScore}
      </div>
      <button onClick={onReadyClick} hidden={startState !== StartState.ready}>
        Ready
      </button>
      <button onClick={onReadyClick} hidden={startState !== StartState.done}>
        Restart
      </button>
      <div style={{color: 'white'}} hidden={startState !== StartState.quit}>
        상대방이 나갔습니다.
      </div>
      <div style={{color: 'white'}} hidden={startState !== StartState.waiting}>
        상대방 기다리는 중...
      </div>
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
