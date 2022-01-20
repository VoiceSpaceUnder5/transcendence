import React from 'react';
import {MenuList} from '../common/MenuList';
import MatchRecord from './MatchRecord';
import {FilteredRecord} from '../../hooks/useRecord';

interface MatchRecordsProps {
  records: FilteredRecord[];
  height?: string;
}

function MatchRecords({records, height}: MatchRecordsProps): JSX.Element {
  return (
    <MenuList height={height}>
      {records.map(record => (
        <MatchRecord key={record.id} record={record} />
      ))}
    </MenuList>
  );
}

export default MatchRecords;
