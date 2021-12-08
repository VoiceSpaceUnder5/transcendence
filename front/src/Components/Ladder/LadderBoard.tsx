import React from 'react';
import BackBoard from '../common/BackBoard';
import LadderBox from './LadderBox';
import TitleDiv from '../common/TitleDiv';

interface LadderProps {
  ladderImagePath: string;
  point: number;
  win: number;
  lose: number;
}

export default function LadderBoard(props: LadderProps): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>래더</TitleDiv>
      <LadderBox
        ladderImagePath={props.ladderImagePath}
        point={props.point}
        win={props.win}
        lose={props.lose}
      ></LadderBox>
    </BackBoard>
  );
}
