import React, {ReactNode} from 'react';
import styled from 'styled-components';

const ChannelListStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 440px;
  width: 89%;
`;

interface ChannelListProps {
  children: ReactNode;
}

export default function ChannelList({children}: ChannelListProps): JSX.Element {
  return <ChannelListStyles>{children}</ChannelListStyles>;
}
