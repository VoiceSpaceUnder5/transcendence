import React from 'react';
import {
  BackboardBoxLayout,
  BackboardBoxInnerLayout,
} from '../components/common/Body';
import MatchRecord from '../components/matchRecord/MatchRecordBoard';
import Ladder from '../components/ladder/LadderBoard';
import AchievementBoard from '../components/achievement/AchievementBoard';

function HomePage(): JSX.Element {
  const ladderData = {
    imagePath: `${process.env.PUBLIC_URL}/testImage.png`,
    point: 1000,
    win: 10,
    lose: 5,
  };
  const matchRecordData = [
    {
      userId: 'kilee',
      imagePath: '',
      record: '승',
      isOnline: true,
    },
    {
      userId: 'mijeong',
      imagePath: '',
      record: '패',
      isOnline: true,
    },
    {
      userId: 'hyeonkim',
      imagePath: '',
      record: '승',
      isOnline: false,
    },
  ];
  const achievementData = [
    {achievement: '가', isSuccess: true},
    {achievement: '나', isSuccess: false},
    {achievement: '다', isSuccess: true},
  ];
  return (
    <>
      <BackboardBoxLayout>
        <BackboardBoxInnerLayout>
          <MatchRecord matchRecordData={matchRecordData} />
        </BackboardBoxInnerLayout>
        <BackboardBoxInnerLayout>
          <Ladder ladderData={ladderData} />
          <AchievementBoard achievementData={achievementData} />
        </BackboardBoxInnerLayout>
      </BackboardBoxLayout>
    </>
  );
}

export default HomePage;
