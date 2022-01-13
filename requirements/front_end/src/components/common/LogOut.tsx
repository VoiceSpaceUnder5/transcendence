import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
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
  const history = useHistory();
  const onClick = () => {
    localStorage.removeItem('meId');
    localStorage.removeItem('meName');
    localStorage.clear();
    dispatch(logOut());
    history.push('/');
  };
  return (
    <LogoutStyles>
      <Button bg="dark" onClick={onClick}>
        LogOut
      </Button>
    </LogoutStyles>
  );
}
