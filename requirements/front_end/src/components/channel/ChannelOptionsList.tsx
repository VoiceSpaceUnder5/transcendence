import React, {useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import styled from 'styled-components';
import Button from '../common/Button';
import ChannelUser from './ChannelUser';
import {useDispatch} from 'react-redux';
import {selectMenu} from '../../modules/chatting';
import ChannelSetting from './ChannelSetting';

const GET_USERS_BY_IDS = gql`
  query getUsersByIds($userIds: [Int!]!) {
    getUsersByIds(ids: $userIds) {
      id
      name
      profile_image_thumb
    }
  }
`;

const LEAVE_CHANNEL = gql`
  mutation leaveChannel($input: LeaveChannelInput!) {
    leaveChannel(leaveChannelInput: $input)
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
  userRoles: string[];
  channelId: number;
  channelName: string;
  channelPasswd: string;
  meRole: string;
}

export default function ChannelOptionsList({
  meId,
  userIds,
  userRoles,
  channelId,
  channelName,
  channelPasswd,
  meRole,
}: ChannelOptionsListProps): JSX.Element {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const usersData = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
  const [leaveChannel] = useMutation(LEAVE_CHANNEL);
  const onLeave = () => {
    leaveChannel({
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
  const onSetting = () => {
    setIsClick(!isClick);
  };
  if (usersData.loading) return <>로딩 중</>;
  if (usersData.error) return <>에러</>;

  const users: UserInfo[] = usersData.data.getUsersByIds;
  return (
    <>
      <ChannelOptionsListStyles top={80}>
        {!isClick ? (
          <>
            <ChannelUser
              meRole={meRole}
              meId={meId}
              userId={meId}
              userRole={meRole}
              name="나"
            />
            {users.map((user, idx) => {
              if (user.id !== meId)
                return (
                  <ChannelUser
                    meRole={meRole}
                    meId={meId}
                    key={user.id}
                    name={user.name}
                    userId={user.id}
                    userRole={userRoles[idx]}
                  />
                );
            })}
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {meRole === 'UR0' && (
                <Button bg="grey" ani={false} onClick={onSetting}>
                  설정
                </Button>
              )}
              <Button bg="grey" ani={false} onClick={onLeave}>
                나가기
              </Button>
            </div>
          </>
        ) : (
          <ChannelSetting
            channelId={channelId}
            onBack={onSetting}
            channelName={channelName}
            channelPasswd={channelPasswd}
          />
        )}
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
