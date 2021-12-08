import React from 'react';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import Chat from '../Components/Chat';
import Main from '../Components/Main';
import MatchRecord from '../Components/MatchRecord';
import Ladder from '../Components/Ladder';
import AchievementBoard from '../Components/AchievementBoard';

const HomeDivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 47px);
`;

function Home(): JSX.Element {
  return (
    <Main>
      <Navbar />
      <HomeDivStyle>
        <MatchRecord />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Ladder
            ladderImagePath="path"
            win={15}
            lose={5}
            point={1000}
          ></Ladder>
          <AchievementBoard />
        </div>
      </HomeDivStyle>
      <Chat />
    </Main>
  );
}

export default Home;
