import React from 'react';
import styled from 'styled-components';

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

  /* BackGround */
  ${props => {
    console.log(props.content);
    if (props.content === 0) {
      return `
      background-color: rgba(200, 0, 0, 0.2);
      `;
    } else if (props.content === 1) {
      return `
      background-color: rgba(0, 255, 0, 0.2);
      `;
    } else if (props.content === 2) {
      return `
        background-color: rgba(255, 200, 0, 0.2);
      `;
    } else {
      return `
        background-color: rgba(0, 0, 255, 0.2);
      `;
    }
  }}
`;

interface ChatBodyProps {
  contentIdx: number;
}

function ChatBody({contentIdx}: ChatBodyProps): JSX.Element {
  return (
    <ChatBodyList content={contentIdx}>
      <button style={{width: '100%'}}>hi</button>
    </ChatBodyList>
  );
}

export default ChatBody;
