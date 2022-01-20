import React, {useEffect, useState} from 'react';
import BackBoard from '../common/BackBoard';
import LadderBox from './LadderBox';
import TitleDiv from '../common/TitleDiv';
import {FilteredRecord} from '../../hooks/useRecord';

interface LadderBoardProps {
  records: FilteredRecord[];
}

interface LadderInfo {
  win: number;
  lose: number;
  point: number;
}

export default function LadderBoard({records}: LadderBoardProps): JSX.Element {
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
    }
  }, [records]);
  if (!records || ladderInfo === undefined) return <>로딩 중..</>;
  return (
    <BackBoard>
      <TitleDiv>래더</TitleDiv>
      <LadderBox
        point={ladderInfo.point}
        win={ladderInfo.win}
        lose={ladderInfo.lose}
      ></LadderBox>
    </BackBoard>
  );
}
