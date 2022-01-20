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
            <Ladder records={records} />
            <AchievementBoard />
          </BackboardBoxInnerLayout>
        </BackboardBoxLayout>
        <Chat />
      </Body>
    </>
  );
}

export default HomePage;
