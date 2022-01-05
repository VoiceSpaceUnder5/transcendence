import {gql, useQuery} from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import ChannelUser from './ChannelUser';

const GET_USERS_BY_IDS = gql`
  query getUsersByIds($userIds: [Int!]!) {
    getUsersByIds(userIds: $userIds) {
      id
      name
      profile_image
    }
  }
`;

interface UserInfo {
  id: number;
  name: string;
  profile_image: string;
}

interface ChannelUsersListProps {
  meId: number;
  userIds: number[];
  role: string;
}

export default function ChannelUsersList({
  meId,
  userIds,
  role,
}: ChannelUsersListProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  // console.log(data.getUsersByIds);
  const users: UserInfo[] = data.getUsersByIds;
  return (
    <ChannelUsersListStyles>
      <ChannelUser
        role={role}
        meId={meId}
        userId={meId}
        name="나"
        imagePath=""
      />
      {users.map(user => {
        if (user.id !== meId)
          return (
            <ChannelUser
              role={role}
              meId={meId}
              key={user.id}
              name={user.name}
              userId={user.id}
              imagePath=""
            />
          );
      })}
    </ChannelUsersListStyles>
  );
}

const ChannelUsersListStyles = styled.ul`
  position: absolute;
  top: 80px;
  left: 45%;
  width: 152px;
  background-color: #dddddd;
  lists-tyle: none;
  padding: 4px;
  max-height: 68%;
  overflow-y: auto;
  border-radius: 8px;
`;
