import React from 'react';
import styled from 'styled-components';
import ChannelInfoList from './ChannelInfoList';
import ChannelInfo from './ChannelInfo';

const ChannelStyles = styled.div`
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

interface ChannelProps {
  channelId: string;
  channelPeople: number;
  isPrivate: boolean;
}

export default function Channel({
  channelId,
  channelPeople,
  isPrivate,
}: ChannelProps): JSX.Element {
  return (
    <ChannelStyles>
      <ChannelInfoList>
        <ChannelInfo>
          {channelId}
          {isPrivate && ' 🔑'}
        </ChannelInfo>
        <ChannelInfo>{channelPeople}명</ChannelInfo>
      </ChannelInfoList>
    </ChannelStyles>
  );
}
