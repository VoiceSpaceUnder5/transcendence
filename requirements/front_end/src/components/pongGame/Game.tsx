import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import GameExit from './GameExit';
import {GameData} from './GameData';
import {removeListener} from 'process';
import Button from '../common/Button';

const paddleWidth = 30;
const paddleHeight = 100;
const ballWidth = 30;
const ballHeight = 30;
const canvasWidth = 800;
const canvasHeight = 600;

interface startGamePayload {
  isRandomMatch: boolean;
  opponentUserId: number;
  isHard: boolean;
  isLadder: boolean;
  userId: number;
}

enum ControllData {
  up,
  down,
  nothing,
}

enum StartState {
  waiting,
  ready,
  start,
  done,
  quit,
}

// 여기서 프론트 게임을 다 구현해보자.
export default function Game(): JSX.Element {
  const history = useHistory();
  const [recieveData, setRecieveData] = useState();
  const [startState, setStartState] = useState<StartState>(StartState.waiting);

  useEffect(() => {
    // 게임 신청
    const payload: startGamePayload = {
      isRandomMatch: true,
      opponentUserId: 0,
      isHard: GameData.isHard,
      isLadder: GameData.isLadder,
      userId: GameData.id,
    };
    GameData.socket.emit('startGame', payload);
    GameData.socket.on('test', payload => {
      console.log(payload);
    });
    GameData.socket.on('forceQuit', () => {
      setStartState(StartState.quit);
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
      // addEventListener('keydown', keydownEvent);
      // addEventListener('keyup', keyupEvent);
    });
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
    <div>
      <GameExit onExitClick={onExit} />
      <button onClick={onReadyClick} hidden={startState !== StartState.ready}>
        Ready
      </button>
      <canvas width={canvasWidth} height={canvasHeight}></canvas>
    </div>
  );
}
