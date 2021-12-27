import React from 'react';

export default function LoginPage(): JSX.Element {
  const onClick = () => {
    window.location.href = 'http://api.ts.io:30000/auth/fortytwo';
  };
  return (
    <>
      <div>트랜센던스</div>
      <button onClick={onClick}>로그인</button>
    </>
  );
}
