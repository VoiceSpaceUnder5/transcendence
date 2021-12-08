import React from 'react';
import Navbar from '../Components/Navbar';
import Chat from '../Components/Chat';
import Body, {
  PageContentStyle,
  PageContentInnerStyle,
} from '../Components/Body';
import MatchRecord from '../Components/MatchRecordBoard';
import Ladder from '../Components/LadderBoard';
import AchievementBoard from '../Components/AchievementBoard';

function Home(): JSX.Element {
  return (
    <Body>
      <Navbar />
      <PageContentStyle>
        <PageContentInnerStyle>
          <MatchRecord />
        </PageContentInnerStyle>
        <PageContentInnerStyle>
          <Ladder
            ladderImagePath="path"
            win={15}
            lose={5}
            point={1000}
          ></Ladder>
          <AchievementBoard />
        </PageContentInnerStyle>
      </PageContentStyle>
      <Chat />
    </Body>
  );
}

export default Home;
