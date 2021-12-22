import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import ChatMenu from './ChatMenu';
import ChatBody from './ChatBody';
import {selectChatMenu} from '../../modules/chatting';
import {RootState} from '../../modules';

const ChatBoardStyles = styled.div<{visible: boolean}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;

  ${props => !props.visible && `display: none;`}

  /* Size */
  width: 320px;
  height: 45vh;

  /* Background */
  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 8px;
`;

interface ChatBoardProps {
  visible: boolean;
}

export default function ChatBoard({visible}: ChatBoardProps): JSX.Element {
  const {menuIdx} = useSelector((state: RootState) => ({
    menuIdx: state.chatting.menuIdx,
  }));
  const dispatch = useDispatch();
  const onChatMenuClick = (idx: number) => dispatch(selectChatMenu(idx));
  return (
    <ChatBoardStyles visible={visible}>
      <ChatMenu onClick={onChatMenuClick} clickedIdx={menuIdx} />
      <ChatBody contentIdx={menuIdx} />
    </ChatBoardStyles>
  );
}
