import {gql, useQuery} from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ChannelUser from './ChannelUser';

const GET_USERS_BY_IDS = gql`
  query getUsersByIds($userIds: [Int!]!) {
    getUsersByIds(userIds: $userIds) {
      id
      name
      profile_image_thumb
    }
  }
`;

const GET_ME = gql`
  query getMe {
    getMe {
      profile_image_thumb
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
  const usersData = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
  const meData = useQuery(GET_ME);
  if (usersData.loading || meData.loading) return <>로딩 중</>;
  if (usersData.error || meData.error) return <>에러</>;
  const users: UserInfo[] = usersData.data.getUsersByIds;
  return (
    <>
      <ChannelUsersListStyles top={80}>
        <ChannelUser
          role={role}
          meId={meId}
          userId={meId}
          name="나"
          imagePath={meData.data.getMe.profile_image_thumb}
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
                imagePath={user.profile_image}
              />
            );
        })}
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {(role === 'UR0' || role === 'UR1') && (
            <Button bg="grey" ani={false}>
              설정
            </Button>
          )}
          <Button bg="grey" ani={false}>
            나가기
          </Button>
        </div>
      </ChannelUsersListStyles>
    </>
  );
}

const ChannelUsersListStyles = styled.ul<{top?: number}>`
  position: absolute;
  top: ${props => props.top}px;
  left: 45%;
  width: 152px;
  background-color: #dddddd;
  lists-tyle: none;
  padding: 4px;
  max-height: 68%;
  overflow-y: auto;
  border-radius: 8px;
`;
