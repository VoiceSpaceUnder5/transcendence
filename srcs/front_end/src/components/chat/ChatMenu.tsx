import React from 'react';
import styled, {css} from 'styled-components';

interface ChatMenuProps {
  onClick: (idx: number) => void;
  clickedIdx: number;
}

function ChatMenu({onClick, clickedIdx}: ChatMenuProps): JSX.Element {
  const items = ['친구 목록', '참여 중', '채널 탐색', '채널 생성'];
  return (
    <ChatMenuList>
      {items.map((item, idx) => {
        return (
          <ChatMenuItem
            key={idx}
            index={idx}
            onClick={() => onClick(idx)}
            clickedIdx={clickedIdx}
          >
            {item}
          </ChatMenuItem>
        );
      })}
    </ChatMenuList>
  );
}

export default ChatMenu;

const ChatMenuList = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const ChatMenuItem = styled.button<{index: number; clickedIdx: number}>`
  /* Text */

  font-style: normal;
  font-weight: 600;
  font-size: 100%;
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
    transition: 0.3s;
  }

  &: not(: hover) {
    transition: 0.3s;
  }

  &: active {
    background-color: #ffffff;
    transition: 0.3s;
  }

  &: focus {
    background-color: #ffffff;
    transition: 0.3s;
  }
`;
