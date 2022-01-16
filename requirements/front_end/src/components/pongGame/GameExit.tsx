import React from 'react';
import Button from '../common/Button';

interface OnGameExitProps {
  onExitClick: () => void;
}

function GameExit({onExitClick}: OnGameExitProps): JSX.Element {
  return (
    <Button bg="dark" large onClick={onExitClick}>
      <span>게임 종료</span>
    </Button>
  );
}

export default GameExit;
