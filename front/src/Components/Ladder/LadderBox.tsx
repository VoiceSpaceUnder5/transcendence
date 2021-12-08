import React from 'react';
import styled from 'styled-components';

const LadderBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;

  position: static;
  width: 242px;

  /* Color / Primary */

  background: #343a40;
  border-radius: 25px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const LadderInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  position: static;
  width: 178px;
  height: 204px;
  left: 32px;
  top: 16px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 16px 0px;
`;

const LadderMarkBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 124px;
  /* 그레이 */
  background: #89969f;
  border-radius: 10px;
`;

const ImageStyle = styled.img`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;

  /* Color / hover */

  color: rgba(247, 247, 247, 0.8);
`;

const TextStyle = styled.div`
  position: static;
  width: 178px;
  height: 24px;
  left: 0px;
  top: 140px;

  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #ffffff;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0px;
`;

interface LadderBoxProps {
  ladderImagePath: string;
  point: number;
  win: number;
  lose: number;
}

export default function LadderBox(props: LadderBoxProps): JSX.Element {
  return (
    <LadderBoxStyle>
      <LadderInfoStyle>
        <LadderMarkBoxStyle>
          <ImageStyle src={'props.ladderImagePath'} />
        </LadderMarkBoxStyle>
        <TextStyle>점수 {props.point}</TextStyle>
        <TextStyle>
          승 {props.win} 패 {props.lose}
        </TextStyle>
      </LadderInfoStyle>
    </LadderBoxStyle>
  );
}
