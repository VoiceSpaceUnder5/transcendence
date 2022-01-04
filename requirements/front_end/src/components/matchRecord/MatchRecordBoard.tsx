import React from 'react';
import BackBoard from '../common/BackBoard';
import {MenuList} from '../common/MenuList';
import Friend from '../friend/Friend';
import TitleDiv from '../common/TitleDiv';

interface MatchRecordBoardProps {
  matchRecordData: {
    username: string;
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
            key={matchRecord.username}
            imagePath={matchRecord.imagePath}
            username={matchRecord.username}
            isOnline={matchRecord.isOnline}
            matchRecord={matchRecord.record}
          ></Friend>
        ))}
      </MenuList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
