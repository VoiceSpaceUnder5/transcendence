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
}

interface GameScoreData {
  leftScore: number;
  rightScore: number;
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
export default function SpectateGame(): JSX.Element {
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
    if (!GameData.socket) history.push('/home');
    if (GameData.socket) {
      GameData.socket.emit('spectate', {onGameUserId: GameData.onGameUserId});
      GameData.socket.on('forceQuit', () => {
        setStartState(StartState.quit);
      });
      GameData.socket.on('count', ({counter}: {counter: string}) => {
        setCounter(counter);
        setStartState(StartState.run);
      });
      GameData.socket.on(
        'updateScore',
        (score: {leftScore: number; rightScore: number}) => {
          setScore(score);
        },
      );
      // setUserNames({rightName: rightName, leftName: leftName});
      GameData.socket.on(
        'updateUserName',
        (names: {leftName: string; rightName: string}) => {
          setUserNames(names);
        },
      );
      GameData.socket.on('gameOver', (gameScoreData: GameScoreData) => {
        setScore(gameScoreData);
      });
      GameData.socket.on('done', (gameScoreData: GameScoreData) => {
        setScore(gameScoreData);
        setStartState(StartState.waiting);
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
        },
      );
    }
  }, []);

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
      <div style={{color: 'white'}} hidden={startState !== StartState.quit}>
        방이 제거되었습니다.
      </div>
      <div style={{color: 'white'}} hidden={startState !== StartState.waiting}>
        게임 준비중입니다...
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
