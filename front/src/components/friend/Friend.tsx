import React from 'react';
import styled from 'styled-components';
import FriendInfo from './FriendInfo';
import FriendInfoList from './FriendInfoList';

const FriendStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 15px;
  margin-bottom: 8px;
  width: inherit;

  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 12.5px;

  ${props => props.theme.padSize} {
    width: 90%;
  }
`;

const ProfileImageStyle = styled.img<{isOnline?: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid
    ${props => (props.isOnline ? `grey;` : `${props.theme.online};`)};
`;

interface FriendProps {
  imagePath?: string;
  userId: string;
  isOnline: boolean;
  matchRecord?: string;
  description?: string;
}

export default function Friend({
  userId,
  isOnline,
  matchRecord,
  description,
}: FriendProps): JSX.Element {
  return (
    <FriendStyle>
      <ProfileImageStyle src="testImage.png" isOnline={isOnline} />
      <FriendInfoList>
        {userId && <FriendInfo>{userId}</FriendInfo>}
        {description && <FriendInfo>{description}</FriendInfo>}
        {matchRecord && <FriendInfo>{matchRecord}</FriendInfo>}
      </FriendInfoList>
    </FriendStyle>
  );
}
