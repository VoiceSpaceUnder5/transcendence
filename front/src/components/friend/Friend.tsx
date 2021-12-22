import React, {useState} from 'react';
import styled from 'styled-components';
import {MenuInfoList, MenuInfo} from '../common/MenuList';

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
  justify-content: space-between;
  align-items: center;
  position: absolute;
  display: ${props => !props.visible && 'none'};
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12.5px;
`;

const OptionButton = styled.button`
  width: 80px;
  white-space: nowrap;
  height: 40px;
  margin: 16px 8px;
  padding: 8px;
  background-color: #bbbbbb;
  border: 0px;
  border-radius: 8px;

  &: hover {
    background-color: #cccccc;
  }
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
  imagePath,
  isOnline,
  matchRecord,
  description,
}: FriendProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const onDivClick = () => !visible && setVisible(true);
  const onBackBtnClick = () => setVisible(false);
  return (
    <FriendStyle onClick={onDivClick}>
      <ProfileImageStyle src={imagePath} isOnline={isOnline} />
      <MenuInfoList>
        {userId && <MenuInfo>{userId}</MenuInfo>}
        {description && <MenuInfo>{description}</MenuInfo>}
        {matchRecord && <MenuInfo>{matchRecord}</MenuInfo>}
      </MenuInfoList>
      <FriendOptions visible={visible}>
        <OptionButton>대화하기</OptionButton>
        <OptionButton>게임신청</OptionButton>
        <OptionButton onClick={onBackBtnClick}>뒤로</OptionButton>
      </FriendOptions>
    </FriendStyle>
  );
}
