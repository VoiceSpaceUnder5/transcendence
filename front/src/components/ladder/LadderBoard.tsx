import React from 'react';
import BackBoard from '../common/BackBoard';
import LadderBox from './LadderBox';
import TitleDiv from '../common/TitleDiv';

interface LadderBoardProps {
  ladderData: {
    imagePath: string;
    point: number;
    win: number;
    lose: number;
  };
}

export default function LadderBoard({
  ladderData,
}: LadderBoardProps): JSX.Element {
  return (
    <BackBoard>
      <TitleDiv>래더</TitleDiv>
      <LadderBox
        ladderImagePath={ladderData.imagePath}
        point={ladderData.point}
        win={ladderData.win}
        lose={ladderData.lose}
      ></LadderBox>
    </BackBoard>
  );
}
