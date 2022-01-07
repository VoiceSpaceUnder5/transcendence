import React, {FormEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import Button from '../common/Button';

interface OnGameExitProps {
  onExitClick: () => void;
}

function GameExit({onExitClick}: OnGameExitProps): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const onToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  return (
    <Button large onClick={onExitClick}>
      <span>게임 종료</span>
    </Button>
  );
}

export default GameExit;
