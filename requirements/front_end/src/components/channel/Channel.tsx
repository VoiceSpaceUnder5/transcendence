import React from 'react';
import styled from 'styled-components';
import {MenuInfoList, MenuInfo} from '../common/MenuList';

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

  &: hover {
    background-color: ${props => props.theme.greyButtonBg};
    transition: 0.5s;
  }
`;

interface ChannelProps {
  id: number;
  name: string;
  number: number;
  isPrivate: boolean;
  role?: string;
  onClick: () => void;
}

export default function Channel({
  name,
  number,
  isPrivate,
  // role,
  onClick,
}: ChannelProps): JSX.Element {
  return (
    <ChannelStyles onClick={onClick}>
      <MenuInfoList>
        <MenuInfo>
          {name}
          {isPrivate && ' (비)'}
        </MenuInfo>
        <MenuInfo>{number}명</MenuInfo>
      </MenuInfoList>
    </ChannelStyles>
  );
}
