import React, {useEffect} from 'react';
import Phaser from 'phaser';
import {config} from './script';
import {useHistory} from 'react-router-dom';
import GameExit from './GameExit';
import {GameData} from './GameData';
import {io} from 'socket.io-client';

export default function Game(): JSX.Element {
  const history = useHistory();
  useEffect(() => {
    // 게임 신청
    const phaser = new Phaser.Game(config);
    GameData.setSocket(io('http://api.ts.io:33000/game'));
    GameData.setId(Number(localStorage.getItem('meId')));
    // setPhaser(new Phaser.Game(config));
    return () => {
      phaser?.destroy(true);
    };
  }, []);
  const onExit = () => {
    history.push('/home');
  };
  return (
    <div>
      <GameExit onExitClick={onExit} />
    </div>
  );
}
