import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {logOut} from '../../modules/auth';
import Button from './Button';

const LogoutStyles = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
`;

export default function LogOut(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem('meId');
    localStorage.removeItem('meName');
    localStorage.clear();
    dispatch(logOut());
    navigate('/');
  };
  return (
    <LogoutStyles>
      <Button bg="dark" onClick={onClick}>
        LogOut
      </Button>
    </LogoutStyles>
  );
}
