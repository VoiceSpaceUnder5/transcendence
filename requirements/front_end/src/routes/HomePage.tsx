import React from 'react';
import Body from '../components/common/Body';
import Navbar from '../components/common/Navbar';
import Chat from '../components/chat/Chat';
import {
  BackboardBoxLayout,
  BackboardBoxInnerLayout,
} from '../components/common/Body';
import Ladder from '../components/ladder/LadderBoard';
import AchievementBoard from '../components/achievement/AchievementBoard';
import MatchRecordBoard from '../components/matchRecord/MatchRecordBoard';
import useRecord from '../hooks/useRecord';

function HomePage(): JSX.Element {
  const ladderData = {
    imagePath: `${process.env.PUBLIC_URL}/testImage.png`,
    point: 1000,
    win: 10,
    lose: 5,
  };
  const achievementData = [
    {achievement: '가', isSuccess: true},
    {achievement: '나', isSuccess: false},
    {achievement: '다', isSuccess: true},
  ];
  const {loading, error, records} = useRecord(
    Number(localStorage.getItem('meId')),
  );
  if (loading) return <>로딩...</>;
  if (error) return <>에러..</>;
  return (
    <>
      <Body>
        <Navbar />
        <BackboardBoxLayout>
          <BackboardBoxInnerLayout speed={5}>
            <MatchRecordBoard records={records} />
          </BackboardBoxInnerLayout>
          <BackboardBoxInnerLayout speed={20}>
            <Ladder ladderData={ladderData} />
            <AchievementBoard achievementData={achievementData} />
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default HomePage;
