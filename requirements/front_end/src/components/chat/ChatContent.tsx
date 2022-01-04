import React from 'react';
import styled from 'styled-components';
import RelationList from './Relations/RelationsList';
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
  menuIdx: number;
}

export default React.memo(function ChatContent({
  menuIdx,
}: ChatContentProps): JSX.Element {
  let element;
  switch (menuIdx) {
    case 0:
      element = <RelationList />;
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
      element = <JoinChatting />;
      break;
    case 5:
      element = <Chatting />;
      break;
  }
  return <ChatContentStyle idx={menuIdx}>{element}</ChatContentStyle>;
});
