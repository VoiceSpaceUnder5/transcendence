import React, {useState, useEffect} from 'react';
import {MenuList} from '../common/MenuList';
import {useQuery} from '@apollo/client';
import {GET_RECORDS} from '../../gql/query';
import MatchRecord from './MatchRecord';

interface Record {
  id: number;
  leftUserId: number;
  rightUserId: number;
  resultId: string;
}

interface filteredRecord {
  id: number;
  opponentId: number;
  result: string | undefined;
}

type Key = 'leftUserId' | 'rightUserId';

interface MatchRecordProps {
  userId: number;
  height?: string;
}

function MatchRecords({userId, height}: MatchRecordProps): JSX.Element {
  const [records, setRecords] = useState<filteredRecord[]>([]);
  const {loading, error, data} = useQuery(GET_RECORDS, {
    variables: {
      input: userId,
    },
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    if (!data) return;
    const sortedRecords = filterRecord(data.getUserById.records);
    setRecords(sortedRecords);
  }, [data]);
  const filterRecord = (records: Record[]) => {
    const filteredRecord = records.map(record => {
      let result;
      const myPosition = Object.keys(record).find(
        (key: string) => record[key as Key] === userId,
      );
      if (
        (myPosition === 'leftUserId' && record.resultId === 'BR0') ||
        (myPosition === 'rightUserId' && record.resultId === 'BR1')
      ) {
        result = '승';
      } else if (
        (myPosition === 'leftUserId' && record.resultId === 'BR1') ||
        (myPosition === 'rightUserId' && record.resultId === 'BR0')
      ) {
        result = '패';
      }
      return {
        id: record.id,
        opponentId:
          myPosition === 'leftUserId' ? record.rightUserId : record.leftUserId,
        result,
      };
    });
    return filteredRecord;
  };
  if (loading) return <>로딩 중..</>;
  if (error) return <>에러</>;
  return (
    <MenuList height={height}>
      {records.map(record => (
        <MatchRecord key={record.id} record={record} />
      ))}
    </MenuList>
  );
}

export default MatchRecords;
