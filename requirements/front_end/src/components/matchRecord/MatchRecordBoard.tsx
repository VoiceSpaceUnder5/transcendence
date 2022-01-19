import React from 'react';
import BackBoard from '../common/BackBoard';
import TitleDiv from '../common/TitleDiv';
import MatchRecords from './MatchRecords';

function MatchRecordBoard(): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>대전 기록</TitleDiv>
      <MatchRecords userId={Number(localStorage.getItem('meId'))} />
    </BackBoard>
  );
}

export default MatchRecordBoard;
