import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Img from '../common/Img';
import ChannelUserProfile from './ChannelUserProfile';

interface ChannelUserProps {
  meId: number;
  userId: number;
  imagePath?: string;
  name: string;
  role: string;
}

export default function ChannelUser({
  meId,
  userId,
  name,
}: // role,
ChannelUserProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  const onDivClick = () => {
    if (userId !== meId) !isClicked && setIsClicked(true);
  };
  const onBtnClick = () => isClicked && setIsClicked(false);

  return (
    <ChannelUserStyles onClick={onDivClick} isClicked={isClicked}>
      {!isClicked ? (
        <>
          <Img userId={userId} size="channel" />
          <PersonName>{name}</PersonName>
        </>
      ) : (
        <>
          <ChannelUserProfile meId={meId} userId={userId} />
          <Button bg="grey" onClick={onBtnClick}>
            뒤로
          </Button>
        </>
      )}
    </ChannelUserStyles>
  );
}

const ChannelUserStyles = styled.li<{isClicked: boolean}>`
  display: flex;
  ${props => props.isClicked && 'justify-content: space-around;'}
  // justify-content: space-around;
  align-items: center;

  height: 32px;
  padding: 4px;
  padding-right: 0px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PersonName = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
