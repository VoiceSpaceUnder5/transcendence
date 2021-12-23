import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const onClick = () => navigate('/loading');
  return (
    <>
      <div>트랜센던스</div>
      <button onClick={onClick}>로그인</button>
    </>
  );
}
