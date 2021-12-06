import React from 'react';
import styled from 'styled-components';

const ChatBodyList = styled.div<{content: number}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  /* Size */
  width: inherit;
  height: 500px;
  overflow-y: scroll;

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
  return <ChatBodyList content={contentIdx}></ChatBodyList>;
}

export default ChatBody;
