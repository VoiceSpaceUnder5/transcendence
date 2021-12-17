import React from 'react';
import styled from 'styled-components';
import ChatFriendList from './ChatFriendList';
import ParticipatingChannel from './ParticipatingChannel';
import SearchChannel from './SearchChannel';
import CreateChannel from './CreateChannel';

const ChatBodyList = styled.div<{content: number}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  /* Size */
  width: 304px;
  height: 500px;
  overflow-y: auto; // scorll 해놓으면 자리 차지함 ㅡㅡ
  border-radius: 0px 0px 4px 4px;
`;

interface ChatBodyProps {
  contentIdx: number;
}

function ChatBody({contentIdx}: ChatBodyProps): JSX.Element {
  let element;
  switch (contentIdx) {
    case 0:
      element = <ChatFriendList />;
      break;
    case 1:
      element = <ParticipatingChannel />;
      break;
    case 2:
      element = <SearchChannel />;
      break;
    case 3:
      element = <CreateChannel />;
      break;
  }
  return <ChatBodyList content={contentIdx}>{element};</ChatBodyList>;
}

export default ChatBody;
