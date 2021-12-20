import React, {useState} from 'react';
import styled from 'styled-components';
import ChatBoard from './ChatBoard';

const ChatBackground = styled.div`
  /* Position */
  position: fixed;
  bottom: 24px;
  right: 24px;

  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ChatButton = styled.button`
  /* Text */
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${props => props.theme.lightButtonText};

  /* Box */
  padding: 10px 16px;
  background-color: ${props => props.theme.lightButtonBg};
  border: 0px;
  border-radius: 4px;

  &: hover {
    background-color: ${props => props.theme.lightButtonHover};
  }
`;

export default function Chat(): JSX.Element {
  // 리팩토링 필요
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <ChatBackground>
      <ChatBoard visible={visible} />
      <ChatButton onClick={onClick}>{!visible ? '채팅' : '닫기'}</ChatButton>
    </ChatBackground>
  );
}
