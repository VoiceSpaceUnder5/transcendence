import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Img from '../common/Img';
import ChangeAuthority from './ChangeAuthority';
import ChannelUserProfile from './ChannelUserProfile';

interface ChannelUserProps {
  meId: number;
  meRole: string;
  userId: number;
  userRole: string;
  name: string;
  channelId: string;
}

export default function ChannelUser({
  meId,
  meRole,
  userId,
  userRole,
  name,
  channelId,
}: ChannelUserProps): JSX.Element {
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
          {(meRole === 'UR0' || meRole == 'UR1') && (
            <ChangeAuthority
              meId={meId}
              meRole={meRole}
              userId={userId}
              userRole={userRole}
              channelId={channelId}
            />
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
