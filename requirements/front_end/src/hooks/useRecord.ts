import {useState, useEffect} from 'react';
import {ApolloError, useQuery} from '@apollo/client';
import {GET_RECORDS} from '../gql/query';

interface OriginalRecord {
  id: number;
  leftUserId: number;
  rightUserId: number;
  resultId: string;
  modeId: string;
  typeId: string;
}

interface FilteredRecord {
  id: number;
  opponentId: number;
  result: string | undefined;
  modeId: string;
  typeId: string;
}

type Key = 'leftUserId' | 'rightUserId';

interface ReturnType {
  loading: boolean;
  error: ApolloError | undefined;
  records: FilteredRecord[];
}

export default function useRecord(userId: number): ReturnType {
  const {loading, error, data} = useQuery(GET_RECORDS, {
    variables: {
      input: userId,
    },
    fetchPolicy: 'no-cache',
  });
  const [filteredRecords, setFilteredRecords] = useState<FilteredRecord[]>([]);

  useEffect(() => {
    const filterRecord = (
      originalRecords: OriginalRecord[],
    ): FilteredRecord[] => {
      const filteredRecord = originalRecords.map(record => {
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
            myPosition === 'leftUserId'
              ? record.rightUserId
              : record.leftUserId,
          result,
          typeId: record.typeId,
          modeId: record.modeId,
        };
      });
      return filteredRecord;
    };

    if (data) {
      const filteredRecord = filterRecord(data.getUserById.records);
      setFilteredRecords(filteredRecord);
    }
  }, [data]);

  return {loading, error, records: filteredRecords};
}
