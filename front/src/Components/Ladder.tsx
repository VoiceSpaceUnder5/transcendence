import React from 'react';
import BackBoard from './BackBoard';
import LadderBox from './LadderBox';
import styled from 'styled-components';

const TitleText = styled.div`
  position: static;
  width: 91.53px;
  height: 24px;
  left: 207.23px;
  top: 30px;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #ffffff;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 0px;
`;

interface LadderProps {
  ladderImagePath: string;
  point: number;
  win: number;
  lose: number;
}

export default function Ladder(props: LadderProps): JSX.Element {
  return (
    <BackBoard>
      <TitleText>래더</TitleText>
      <LadderBox
        ladderImagePath={props.ladderImagePath}
        point={props.point}
        win={props.win}
        lose={props.lose}
      ></LadderBox>
    </BackBoard>
  );
}
