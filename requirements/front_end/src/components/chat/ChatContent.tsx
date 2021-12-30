import React from 'react';
import styled from 'styled-components';
import FriendList from './FriendList';
import ParticipatingChannel from './ParticipatingChannel';
import SearchChannel from './SearchChannel';
import CreateChannel from './CreateChannel';
import JoinChatting from './JoinChatting';
import Chatting from './Chatting';

const ChatContentStyle = styled.div<{idx: number}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
  ${props => props.idx === 4 && `padding-top: 0px;`}

  /* Size */
  width: 304px;
  height: 500px;
  overflow-y: auto; // scorll 해놓으면 자리 차지함 ㅡㅡ
  border-radius: 0px 0px 4px 4px;
  ${props => props.idx === 4 && `width: 320px; border-radius: 0px`}
`;

interface ChatContentProps {
  id: number;
  name: string;
  menuIdx: number;
}

export default React.memo(function ChatContent({
  id,
  name,
  menuIdx,
}: ChatContentProps): JSX.Element {
  let element;
  switch (menuIdx) {
    case 0:
      element = <FriendList userId={id} />;
      break;
    case 1:
      element = <ParticipatingChannel userId={id} />;
      break;
    case 2:
      element = <SearchChannel userId={id} />;
      break;
    case 3:
      element = <CreateChannel userId={id} />;
      break;
    case 4:
      element = <JoinChatting userId={id} />;
      break;
    case 5:
      element = <Chatting userId={id} name={name} />;
      break;
  }
  return <ChatContentStyle idx={menuIdx}>{element}</ChatContentStyle>;
});
