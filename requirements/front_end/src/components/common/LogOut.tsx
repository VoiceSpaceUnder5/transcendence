import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logOut} from '../../modules/auth';
import Button from './Button';

export default function LogOut(): JSX.Element {
  // 로그인 동작
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(logOut());
    localStorage.removeItem('userId');
    navigate('/');
  };
  return (
    <Button bg="dark" onClick={onClick}>
      LogOut
    </Button>
  );
}
