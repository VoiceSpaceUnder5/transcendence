import React from 'react';
import BackBoard from '../common/BackBoard';
import {MenuList} from '../common/MenuList';
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
      <MenuList>
        {matchRecordData.map(matchRecord => (
          <Friend
            key={matchRecord.userId}
            imagePath={matchRecord.imagePath}
            userId={matchRecord.userId}
            isOnline={matchRecord.isOnline}
            matchRecord={matchRecord.record}
          ></Friend>
        ))}
      </MenuList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
