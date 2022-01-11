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
  role,
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
          <div style={{marginRight: '4px'}}>
            <Button bg="grey" onClick={onBtnClick}>
              {'<'}
            </Button>
          </div>
          <div style={{marginRight: '4px'}}>
            <ChannelUserProfile meId={meId} userId={userId} />
          </div>
          {(role === 'UR0' || role === 'UR1') && (
            <Button bg="grey">강퇴</Button>
          )}
        </>
      )}
    </ChannelUserStyles>
  );
}

const ChannelUserStyles = styled.li<{isClicked: boolean}>`
  display: flex;
  ${props => props.isClicked && 'justify-content: flex-start;'}
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
