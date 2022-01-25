import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Friend from './Friend';

const GET_USERS_BY_IDS = gql`
  query ($userIds: [Int!]!) {
    getUsersByIds(ids: $userIds) {
      id
      name
      description
      connectionStatusId
    }
  }
`;
interface User {
  id: number;
  name: string;
  description: string;
  connectionStatusId: string;
}

interface UserListProps {
  typeId: string;
  userIds: number[];
}

export default function UserList({
  userIds,
  typeId,
}: UserListProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
  if (loading) return <></>;
  if (error) return <></>;
  return (
    <>
      {data.getUsersByIds.map((user: User) => (
        <Friend
          typeId={typeId}
          key={user.id}
          username={user.name}
          userId={user.id}
          description={user.description ? user.description : '.'}
          connectionStatus={user.connectionStatusId}
        ></Friend>
      ))}
    </>
  );
}
