import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Friend from '../friend/Friend';

const GET_USER_BY_ID = gql`
  query getUserById($input: Int!) {
    getUserById(id: $input) {
      name
      profile_image_thumb
      connectionStatusId
    }
  }
`;

interface MatchRecordProps {
  record: {
    id: number;
    opponentId: number;
    result?: string;
    typeId: string;
    modeId: string;
  };
}

export default function MatchRecord({record}: MatchRecordProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {
      input: record.opponentId,
    },
    fetchPolicy: 'no-cache',
  });
  if (loading) <></>;
  if (error) <>에러!</>;
  let recordAndMode;
  if (record.result) {
    if (record.typeId === 'BT1') {
      recordAndMode = `${record.result}[래더]`;
    } else if (record.typeId === 'BT0') {
      if (record.modeId === 'BM0') {
        recordAndMode = `${record.result}[일반, normal]`;
      } else if (record.modeId === 'BM1') {
        recordAndMode = `${record.result}[일반, hard]`;
      }
    }
  }
  return (
    <>
      {record.result !== undefined && data && (
        <Friend
          key={data.getUserById.username}
          imagePath={data.getUserById.profile_image_thumb}
          userId={record.opponentId}
          username={data.getUserById.name}
          matchRecord={recordAndMode}
          connectionStatus={data.getUserById.connectionStatusId}
        ></Friend>
      )}
    </>
  );
}
