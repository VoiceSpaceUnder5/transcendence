import React from 'react';
import BackBoard from '../common/BackBoard';
import FriendsList from '../friend/FriendList';
import Friend from '../friend/Friend';
import TitleDiv from '../common/TitleDiv';

interface MatchRecordBoardProps {
  matchRecordData: {
    userId: string;
    imagePath: string;
    record: string;
    isOnline: boolean;
  }[];
}

function MatchRecordBoard({
  matchRecordData,
}: MatchRecordBoardProps): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>대전 기록</TitleDiv>
      <FriendsList>
        {matchRecordData.map(matchRecord => (
          <Friend
            key={matchRecord.userId}
            imagePath={matchRecord.imagePath}
            userId={matchRecord.userId}
            isOnline={matchRecord.isOnline}
            matchRecord={matchRecord.record}
          ></Friend>
        ))}
      </FriendsList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
