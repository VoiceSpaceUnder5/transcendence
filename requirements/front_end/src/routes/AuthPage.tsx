import React, {useEffect} from 'react';
// import {useCookies} from 'react-cookie';
// import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
// import {onLogin} from '../modules/auth';

export default function AuthPage(): JSX.Element {
  const navigate = useNavigate();

  const getToken = () => {
    // cookies.accessToken
    navigate('/home');
  };

  useEffect(() => getToken(), []);
  return <>로그인 성공</>;
}
