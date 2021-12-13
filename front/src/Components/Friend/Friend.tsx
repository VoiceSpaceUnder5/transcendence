import React, {ReactNode} from 'react';
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
  children?: ReactNode;
}

export default function Friend(props: FriendProps): JSX.Element {
  return (
    <FriendStyle>
      <ProfileImageStyle src={props.imagePath} />
      <FriendInfoList>
        <FriendInfo>hi</FriendInfo>
        <FriendInfo>hi</FriendInfo>
        <FriendInfo>hi</FriendInfo>
      </FriendInfoList>
    </FriendStyle>
  );
}
