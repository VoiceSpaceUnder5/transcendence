import React from 'react';
import {MenuList} from '../common/MenuList';
import MatchRecord from './MatchRecord';
import useRecord from '../../hooks/useRecord';

interface MatchRecordProps {
  userId: number;
  height?: string;
}

function MatchRecords({userId, height}: MatchRecordProps): JSX.Element {
  const {loading, error, records} = useRecord(userId);
  if (loading) return <>로딩 중..</>;
  if (error) return <>에러!</>;
  return (
    <MenuList height={height}>
      {records.map(record => (
        <MatchRecord key={record.id} record={record} />
      ))}
    </MenuList>
  );
}

export default MatchRecords;
