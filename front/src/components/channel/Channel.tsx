import React from 'react';
import styled from 'styled-components';
import {MenuInfoList, MenuInfo} from '../common/MenuList';
import {useDispatch} from 'react-redux';
import {joinChannel} from '../../modules/chatting';

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
  }
`;

interface ChannelProps {
  id: number;
  name: string;
  number: number;
  isPrivate: boolean;
  onClick?: (id: number, isPrivate: boolean) => void;
}

export default function Channel({
  id,
  name,
  number,
  isPrivate,
}: ChannelProps): JSX.Element {
  const dispatch = useDispatch();
  const onJoinChannel = (id: number) => dispatch(joinChannel(id));
  const onDivClick = () => {
    onJoinChannel(id);
  };
  return (
    <ChannelStyles onClick={onDivClick}>
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
