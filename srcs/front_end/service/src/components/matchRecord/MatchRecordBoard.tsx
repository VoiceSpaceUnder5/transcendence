import React from 'react';
import {FilteredRecord} from '../../hooks/useRecord';
import BackBoard from '../common/BackBoard';
import TitleDiv from '../common/TitleDiv';
import MatchRecords from './MatchRecords';

interface MatchRecordBoardProps {
  records: FilteredRecord[];
}

function MatchRecordBoard({records}: MatchRecordBoardProps): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>대전 기록</TitleDiv>
      <MatchRecords records={records} />
    </BackBoard>
  );
}

export default MatchRecordBoard;
