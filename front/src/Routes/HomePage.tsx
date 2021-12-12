import React from 'react';
import Navbar from '../Components/common/Navbar';
import Chat from '../Components/Chat/Chat';
import Body, {
  BackboardBoxLayout,
  BackboardBoxInnerLayout,
} from '../Components/common/Body';
import MatchRecord from '../Components/MatchRecord/MatchRecordBoard';
import Ladder from '../Components/Ladder/LadderBoard';
import AchievementBoard from '../Components/Achievement/AchievementBoard';

function HomePage(): JSX.Element {
  return (
    <Body>
      <Navbar />
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <MatchRecord />
        </BackboardBoxInnerLayout>
        <BackboardBoxInnerLayout>
          <Ladder
            ladderImagePath="path"
            win={15}
            lose={5}
            point={1000}
          ></Ladder>
          <AchievementBoard />
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
      <Chat />
    </Body>
  );
}

export default HomePage;
