import React, {useEffect, useState} from 'react';
import Phaser from 'phaser';
import {config} from './script';
import {useNavigate} from 'react-router-dom';
import Button from '../common/Button';
import GameExit from './GameExit';

export default function Game() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [phaser, setPhaser] = useState<Phaser.Game | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // 게임 신청
    setIsGameStart(true);
    setPhaser(new Phaser.Game(config));
  }, []);
  const onExit = () => {
    console.log('exit');
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
