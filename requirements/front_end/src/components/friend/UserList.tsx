import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Friend from './Friend';

const GET_USERS_BY_IDS = gql`
  query ($userIds: [Int!]!) {
    getUsersByIds(userIds: $userIds) {
      id
      name
      description
    }
  }
`;

interface UserListProps {
  userIds: number[];
}

interface User {
  id: number;
  name: string;
  description: string;
}

export default function UserList({userIds}: UserListProps): JSX.Element {
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
          key={user.id}
          username={user.name}
          userId={user.id}
          description={user.description ? user.description : '.'}
        ></Friend>
      ))}
    </>
  );
}
