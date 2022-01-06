import React from 'react';
import {gql, useQuery} from '@apollo/client';

const GET_RELATIONS = gql`
  query getRelations($userId: Float!) {
    getRelationsByUserIdTreatAsFirst(userId: $userId) {
      user_second_id
      typeId
    }
  }
`;

interface MessageListProps {
  meId: number;
}

export default function MessageList({meId}: MessageListProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_RELATIONS, {
    variables: {
      userId: meId,
    },
  });

  if (loading) return <>로딩 중...</>;
  if (error) return <>에러...</>;
  data;
  return <></>;
}
