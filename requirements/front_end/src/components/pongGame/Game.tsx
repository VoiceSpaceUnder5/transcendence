import React, {useEffect, useState} from 'react';
import Phaser from 'phaser';
import {config} from './script';

export default function Game() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [phaser, setPhaser] = useState<Phaser.Game | null>(null);
  const onClick = () => {
    // 게임 신청
    setIsGameStart(true);
    setPhaser(new Phaser.Game(config));
  };
  const onExit = () => {
    console.log('exit');
    setIsGameStart(false);
    // 닫자.
    phaser?.destroy(true);
    setPhaser(null);
  };
  useEffect(() => {
    // console.log(phaser);
  }, [phaser]);
  return (
    <div>
      {isGameStart === true ? (
        <button onClick={onExit}>게임 나가기</button>
      ) : (
        <>
          <button onClick={onClick}>입장</button>
        </>
      )}
    </div>
  );
}
