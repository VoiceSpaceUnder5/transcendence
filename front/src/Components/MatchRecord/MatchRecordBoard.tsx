import React from 'react';
import BackBoard from '../common/BackBoard';
import FriendsList from '../Friend/FriendList';
import Friend from '../Friend/Friend';
import TitleDiv from '../common/TitleDiv';

interface MatchRecordBoardProps {
  matchRecordData: {userId: string; imagePath: string; record: string}[];
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
            infos={[matchRecord.userId, matchRecord.record]}
          ></Friend>
        ))}
      </FriendsList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
