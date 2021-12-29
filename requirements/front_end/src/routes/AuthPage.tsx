import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function AuthPage(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);
  return <>로그인 성공</>;
}
