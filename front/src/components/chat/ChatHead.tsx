import React from 'react';
import styled, {css} from 'styled-components';

const ChatHeadList = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const ChatHeadItem = styled.button<{index: number; clickedIdx: number}>`
  /* Text */

  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  text-align: center;

  /* Size */
  width: 80px;
  padding: 16px 0px;

  /* Background */
  ${props =>
    props.clickedIdx === props.index
      ? css`
          background-color: #ffffff;
        `
      : css`
          background-color: rgba(196, 196, 196, 0.8);
        `};
  border: 0px;
  ${props => {
    if (props.index === 0) {
      return css`
        border-radius: 8px 0px 0px 0px;
      `;
    } else if (props.index === 3) {
      return css`
        border-radius: 0px 8px 0px 0px;
      `;
    }
  }}
  &: hover {
    background-color: #f3f3f3;
  }

  &: active {
    background-color: #ffffff;
  }

  &: focus {
    background-color: #ffffff;
  }
`;

interface ChatHeadProps {
  items: string[];
  onClick: (idx: number) => void;
  clickedIdx: number;
}

function ChatHead({items, onClick, clickedIdx}: ChatHeadProps): JSX.Element {
  return (
    <ChatHeadList>
      {items.map((item, idx) => {
        return (
          <ChatHeadItem
            key={idx}
            index={idx}
            onClick={() => onClick(idx)}
            clickedIdx={clickedIdx}
          >
            {item}
          </ChatHeadItem>
        );
      })}
    </ChatHeadList>
  );
}

export default ChatHead;
