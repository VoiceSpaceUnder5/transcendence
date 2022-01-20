import React from 'react';
import styled from 'styled-components';
import {IoMdMedal} from 'react-icons/io';

const LadderBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;

  position: static;
  width: 200px;

  /* Color / Primary */

  background: ${props => props.theme.darkBg};
  border-radius: 25px;
`;

const LadderInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 120px;
  height: 200px;
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

const IconStyle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 100%;
  line-height: 17px;
  text-align: center;
`;

const TextStyle = styled.div`
  position: static;
  width: 178px;
  height: 24px;
  left: 0px;
  top: 140px;

  font-style: normal;
  font-weight: 600;
  font-size: 100%;
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
  point: number;
  win: number;
  lose: number;
}

export default function LadderBox({
  point,
  win,
  lose,
}: LadderBoxProps): JSX.Element {
  let color = 'grey';
  if (point > 200) {
    color = 'yellow';
  } else if (point > 100) {
    color = 'grey';
  } else {
    color = 'black';
  }
  return (
    <LadderBoxStyle>
      <LadderInfoStyle>
        <LadderMarkBoxStyle>
          <IconStyle>
            <IoMdMedal size="50px" color={color} />
          </IconStyle>
        </LadderMarkBoxStyle>
        <TextStyle>점수 {point}</TextStyle>
        <TextStyle>
          승 {win} 패 {lose}
        </TextStyle>
      </LadderInfoStyle>
    </LadderBoxStyle>
  );
}
