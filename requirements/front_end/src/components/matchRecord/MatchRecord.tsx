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
  };
}

export default function MatchRecord({record}: MatchRecordProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_USER_BY_ID, {
    variables: {
      input: record.opponentId,
    },
    fetchPolicy: 'no-cache',
  });
  if (loading) <>로딩 중...</>;
  if (error) <>에러!</>;
  return (
    <>
      {record.result !== undefined && data && (
        <Friend
          key={data.getUserById.username}
          imagePath={data.getUserById.profile_image_thumb}
          userId={record.opponentId}
          username={data.getUserById.name}
          matchRecord={record.result}
          connectionStatus={data.getUserById.connectionStatusId}
        ></Friend>
      )}
    </>
  );
}
