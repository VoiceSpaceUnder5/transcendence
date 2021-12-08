import React from 'react';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Body, {
  PageContentStyle,
  PageContentInnerStyle,
} from '../Components/common/Body';
import MatchRecord from '../Components/MatchRecord/MatchRecordBoard';
import Ladder from '../Components/Ladder/LadderBoard';
import AchievementBoard from '../Components/Achievement/AchievementBoard';

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
