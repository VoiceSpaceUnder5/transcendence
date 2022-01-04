import React, {useState} from 'react';
import styled from 'styled-components';
import {MenuInfoList, MenuInfo} from '../common/MenuList';
import {OptionButton} from '../common/Button';
import UserProfile from './UserProfile';
// import DirectMessages from '../chat/DirectMessage';

interface FriendProps {
  userId?: number;
  imagePath?: string;
  username: string;
  isOnline?: boolean;
  matchRecord?: string;
  description?: string;
}

export default function Friend({
  userId,
  username,
  imagePath,
  isOnline,
  matchRecord,
  description,
}: FriendProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const onDivClick = () => !visible && setVisible(true);
  const changeVisible = () => setVisible(false);
  const onBackClick = () => setProfileVisible(!profileVisible);
  return (
    <FriendStyle onClick={onDivClick}>
      <ProfileImageStyle src={imagePath} isOnline={isOnline} />
      <MenuInfoList>
        {username && <MenuInfo>{username}</MenuInfo>}
        {description && <MenuInfo>{description}</MenuInfo>}
        {matchRecord && <MenuInfo>{matchRecord}</MenuInfo>}
      </MenuInfoList>
      <FriendOptions visible={visible}>
        {/* <DirectMessages changeVisible={changeVisible} /> */}
        {/* <OptionButton>게임신청</OptionButton> */}
        <OptionButton onClick={() => setProfileVisible(!profileVisible)}>
          프로필 보기
        </OptionButton>
        {profileVisible && (
          <UserProfile
            userId={userId as number}
            onBackClick={onBackClick}
          ></UserProfile>
        )}
        <OptionButton onClick={changeVisible}>뒤로</OptionButton>
      </FriendOptions>
    </FriendStyle>
  );
}

const FriendStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 15px;
  margin-bottom: 8px;
  width: inherit;

  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 12.5px;

  &: hover {
    background-color: ${props => props.theme.greyButtonBg};
    transition: 0.5s;
  }

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

const FriendOptions = styled.div<{visible: boolean}>`
  display: flex;
  width: 80%;
  max-width: 300px;
  height: 72px;
  padding: 0px 8px;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  display: ${props => !props.visible && 'none'};
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12.5px;

  @keyframes smoothAppear {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }

  & {
    animation: smoothAppear 0.5s ease-in-out;
  }
`;
