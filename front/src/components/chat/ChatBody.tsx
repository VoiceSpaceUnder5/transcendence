import React from 'react';
import styled from 'styled-components';
import FriendList from './FriendList';
import ParticipatingChannel from './ParticipatingChannel';
import SearchChannel from './SearchChannel';
import CreateChannel from './CreateChannel';
import Chatting from './Chatting';

const ChatBodyStyle = styled.div<{content: number}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8px;
  ${props => props.content === 4 && `padding-top: 0px;`}

  /* Size */
  width: 304px;
  height: 500px;
  overflow-y: auto; // scorll 해놓으면 자리 차지함 ㅡㅡ
  border-radius: 0px 0px 4px 4px;
  ${props => props.content === 4 && `width: 320px; border-radius: 0px`}
`;

interface ChatBodyProps {
  contentIdx: number;
}

function ChatBody({contentIdx}: ChatBodyProps): JSX.Element {
  // 어떤 컴포넌트 렌더링할지
  let element;
  switch (contentIdx) {
    case 0:
      element = <FriendList />;
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
    case 4:
      element = <Chatting />;
      break;
  }
  return <ChatBodyStyle content={contentIdx}>{element}</ChatBodyStyle>;
}

export default ChatBody;
