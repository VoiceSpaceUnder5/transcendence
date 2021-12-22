import React from 'react';
import styled from 'styled-components';

const ChatContentStyle = styled.div<{idx: number}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8px;
  ${props => props.idx === 4 && `padding-top: 0px;`}

  /* Size */
  width: 304px;
  height: 500px;
  overflow-y: auto; // scorll 해놓으면 자리 차지함 ㅡㅡ
  border-radius: 0px 0px 4px 4px;
  ${props => props.idx === 4 && `width: 320px; border-radius: 0px`}
`;

interface ChatContentProps {
  children: React.ReactNode;
  idx: number;
}

function ChatContent({children, idx}: ChatContentProps): JSX.Element {
  return <ChatContentStyle idx={idx}>{children}</ChatContentStyle>;
}

export default ChatContent;
