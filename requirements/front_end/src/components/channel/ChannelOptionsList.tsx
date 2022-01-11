import React from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import styled from 'styled-components';
import Button from '../common/Button';
import ChannelUser from './ChannelUser';
import {useDispatch} from 'react-redux';
import {selectMenu} from '../../modules/chatting';

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

const EXIT_CHANNEL = gql`
  mutation exitChannel($input: DeleteChatChannelUserInput!) {
    deleteChatChannelUser(deleteChatChannelUserInput: $input)
  }
`;

interface UserInfo {
  id: number;
  name: string;
  profile_image: string;
}

interface ChannelOptionsListProps {
  meId: number;
  userIds: number[];
  channelId: number;
  role: string;
}

export default function ChannelOptionsList({
  meId,
  userIds,
  channelId,
  role,
}: ChannelOptionsListProps): JSX.Element {
  const dispatch = useDispatch();
  const usersData = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
  const meData = useQuery(GET_ME);
  const [exitChannel] = useMutation(EXIT_CHANNEL);
  const onClick = () => {
    exitChannel({
      variables: {
        input: {
          userId: meId,
          chatChannelId: channelId,
        },
      },
    }).then(() => {
      dispatch(selectMenu(1));
    });
  };
  if (usersData.loading || meData.loading) return <>로딩 중</>;
  if (usersData.error || meData.error) return <>에러</>;
  const users: UserInfo[] = usersData.data.getUsersByIds;
  return (
    <>
      <ChannelOptionsListStyles top={80}>
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
          <Button bg="grey" ani={false} onClick={onClick}>
            나가기
          </Button>
        </div>
      </ChannelOptionsListStyles>
    </>
  );
}

const ChannelOptionsListStyles = styled.ul<{top?: number}>`
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
