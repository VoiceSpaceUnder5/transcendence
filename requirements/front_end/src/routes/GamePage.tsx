import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {
  BackboardBoxLayout,
  BackboardBoxInnerLayout,
} from '../components/common/Body';
import MatchRecord from '../components/matchRecord/MatchRecordBoard';
import Ladder from '../components/ladder/LadderBoard';
import AchievementBoard from '../components/achievement/AchievementBoard';
import {useLocation} from 'react-router-dom';
import Game from '../components/pongGame/Game';

function GamePage(): JSX.Element {
  const location = useLocation();
  console.log(location.state);

  return (
    <>
      <div style={{position: 'absolute', top: '100px', left: '100px'}}>
        <Game />
      </div>
      <Navbar isStart={location.state.isStart} />
      <Chat />
    </>
  );
}

export default GamePage;
