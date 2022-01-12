import React, {useEffect, useState} from 'react';
import Phaser from 'phaser';
import {config} from './script';
import {useNavigate} from 'react-router-dom';
import GameExit from './GameExit';
import {GameData} from './GameData';
import {io} from 'socket.io-client';

export default function Game(): JSX.Element {
  const [isGameStart, setIsGameStart] = useState(false);
  const [phaser, setPhaser] = useState<Phaser.Game | null>(null);
  const navigate = useNavigate();
  void isGameStart;
  useEffect(() => {
    // 게임 신청
    GameData.setSocket(io('http://api.ts.io:33000/game'));
    GameData.setId(Number(localStorage.getItem('meId')));
    setIsGameStart(true);
    setPhaser(new Phaser.Game(config));
  }, []);
  const onExit = () => {
    setIsGameStart(false);
    // 닫자.
    phaser?.destroy(true);
    setPhaser(null);
    navigate('/home');
  };
  useEffect(() => {
    // console.log(phaser);
  }, [phaser]);
  return (
    <div>
      <GameExit onExitClick={onExit} />
    </div>
  );
}
