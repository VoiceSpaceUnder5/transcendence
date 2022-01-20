import React from 'react';
import BackBoard from '../common/BackBoard';
import LadderBox from './LadderBox';
import TitleDiv from '../common/TitleDiv';
import {FilteredRecord} from '../../hooks/useRecord';

interface LadderBoardProps {
  records: FilteredRecord[];
}

export default function LadderBoard({records}: LadderBoardProps): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>래더</TitleDiv>
      <LadderBox records={records}></LadderBox>
    </BackBoard>
  );
}
