import React from 'react';
import BackBoard from '../common/BackBoard';
import {MenuList} from '../common/MenuList';
import Friend from '../friend/Friend';
import TitleDiv from '../common/TitleDiv';
import {useQuery} from '@apollo/client';
import {GET_RECORDS} from '../../gql/query';

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
  const {loading, error, data} = useQuery(GET_RECORDS);
  if (loading) return <>로딩 중..</>;
  if (error) return <>에러</>;
  console.log(data);
  return (
    <BackBoard>
      <TitleDiv>대전 기록</TitleDiv>
      <MenuList>
        {matchRecordData.map(matchRecord => (
          <Friend
            key={matchRecord.username}
            imagePath={matchRecord.imagePath}
            username={matchRecord.username}
            matchRecord={matchRecord.record}
            connectionStatus="CS1"
          ></Friend>
        ))}
      </MenuList>
    </BackBoard>
  );
}

export default MatchRecordBoard;
