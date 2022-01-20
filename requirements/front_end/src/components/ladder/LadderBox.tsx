import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {IoMdMedal} from 'react-icons/io';
import {FilteredRecord} from '../../hooks/useRecord';

interface LadderBoxProps {
  records: FilteredRecord[];
}

interface LadderInfo {
  win: number;
  lose: number;
  point: number;
}

export default function LadderBox({records}: LadderBoxProps): JSX.Element {
  const [color, setColor] = useState('white');
  const [ladderInfo, setLadderInfo] = useState<LadderInfo | undefined>();
  useEffect(() => {
    const getLadderInfo = (records: FilteredRecord[]) => {
      let point = 0;
      let win = 0;
      let lose = 0;
      records.forEach(record => {
        if (record.typeId === 'BT1') {
          if (record.result === '승') {
            win += 1;
          } else if (record.result === '패') {
            lose += 1;
          }
          point = win * 100 - lose * 150;
        }
      });
      return {
        point,
        win,
        lose,
      };
    };

    if (records) {
      const ladderInfo = getLadderInfo(records);
      setLadderInfo(ladderInfo);
      if (ladderInfo.point > 200) {
        setColor('yellow');
      } else if (ladderInfo.point > 100) {
        setColor('grey');
      } else {
        setColor('black');
      }
    }
  }, [records]);
  if (!records || ladderInfo === undefined) return <>로딩 중..</>;
  return (
    <LadderBoxStyle>
      <LadderInfoStyle>
        <LadderMarkBoxStyle>
          <IconStyle>
            <IoMdMedal size="50px" color={color} />
          </IconStyle>
        </LadderMarkBoxStyle>
        <TextStyle>점수 {ladderInfo.point}</TextStyle>
        <TextStyle>
          승 {ladderInfo.win} 패 {ladderInfo.lose}
        </TextStyle>
      </LadderInfoStyle>
    </LadderBoxStyle>
  );
}

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
