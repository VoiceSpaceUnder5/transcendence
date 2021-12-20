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
    width: 70%;
  }
`;

const ProfileImageStyle = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

interface FriendProps {
  imagePath: string;
  // eslint-disable-next-line
  infos: any[];
}

export default function Friend({imagePath, infos}: FriendProps): JSX.Element {
  return (
    <FriendStyle>
      <ProfileImageStyle src={imagePath} />
      <FriendInfoList>
        {infos.map(info => (
          <FriendInfo key={info.userId}>{info}</FriendInfo>
        ))}
      </FriendInfoList>
    </FriendStyle>
  );
}
