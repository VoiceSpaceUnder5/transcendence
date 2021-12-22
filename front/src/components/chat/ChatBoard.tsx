import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import ChatMenu from './ChatMenu';
import ChatContent from './ChatContent';
import {selectChatMenu} from '../../modules/chatting';
import {RootState} from '../../modules';
import FriendList from './FriendList';
import ParticipatingChannel from './ParticipatingChannel';
import SearchChannel from './SearchChannel';
import CreateChannel from './CreateChannel';
import Chatting from './Chatting';

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
  const [element, setElement] = useState<undefined | JSX.Element>(undefined);
  useEffect(() => {
    switch (menuIdx) {
      case 0:
        setElement(<FriendList />);
        break;
      case 1:
        setElement(<ParticipatingChannel />);
        break;
      case 2:
        setElement(<SearchChannel />);
        break;
      case 3:
        setElement(<CreateChannel />);
        break;
      case 4:
        setElement(<Chatting />);
        break;
    }
  }, [menuIdx]);
  return (
    <ChatBoardStyles visible={visible}>
      <ChatMenu onClick={onChatMenuClick} clickedIdx={menuIdx} />
      <ChatContent idx={menuIdx}>{element}</ChatContent>
    </ChatBoardStyles>
  );
}
