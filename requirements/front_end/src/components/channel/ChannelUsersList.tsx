import {gql, useQuery} from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import ChannelUser from './ChannelUser';

const GET_USERS_BY_IDS = gql`
  query getUsersByIds($userIds: [Int!]!) {
    getUsersByIds(userIds: $userIds) {
      name
      profile_image
    }
  }
`;

interface ChannelUsersListProps {
  userIds: number[];
}

interface UserInfo {
  name: string;
  profile_image: string;
}

export default function ChannelUsersList({
  userIds,
}: ChannelUsersListProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  const users: UserInfo[] = data.getUsersByIds;
  return (
    <ChannelUsersListStyles>
      {users.map((user, idx) => (
        <ChannelUser key={idx} name={user.name} imagePath="" />
      ))}
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
