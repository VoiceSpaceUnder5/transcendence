import React from 'react';
import Game from '../components/pongGame/Game';

function GamePage(): JSX.Element {
  return (
    <div style={{position: 'absolute', top: '20px', left: '315px'}}>
      <Game />
    </div>
  );
}

export default GamePage;
