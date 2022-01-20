import React, {useEffect} from 'react';
import BackBoard from '../components/common/BackBoard';
import Ball from '../components/common/Ball';
import Body, {
  BackboardBoxInnerLayout,
  BackboardBoxLayout,
} from '../components/common/Body';
import Button from '../components/common/Button';
import {GameData} from '../components/pongGame/GameData';

export default function LoginPage(): JSX.Element {
  const onClick = () => {
    window.location.href = 'http://api.ts.io:30000/auth/fortytwo';
  };
  useEffect(() => {
    if (GameData.socket) {
      GameData.socket.disconnect();
    }
  }, []);
  return (
    <>
      <Ball />
      <Body>
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout>
            <BackBoard>
              <h1>트랜센던스</h1>
              <Button onClick={onClick}>로그인</Button>
            </BackBoard>
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
      </Body>
    </>
  );
}
