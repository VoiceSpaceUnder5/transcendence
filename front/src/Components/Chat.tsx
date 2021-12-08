import React, {useState} from 'react';
import styled from 'styled-components';
import ChatHead from './ChatHead';
import ChatBody from './ChatBody';

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

const ChatBoard = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;

  /* Size */
  width: 320px;
  height: 560px;

  /* Background */
  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 8px;
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

function Chat(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clickedIdx, setClickedIdx] = useState<number>(1);
  const onChatButtonClick = () => setIsOpen(!isOpen);
  const onChatHeadClick = (idx: number) => setClickedIdx(idx);
  return (
    <ChatBackground>
      {isOpen && (
        <ChatBoard>
          <ChatHead
            items={['친구 목록', '참여 중', '채널 탐색', '채널 생성']}
            onClick={onChatHeadClick}
            clickedIdx={clickedIdx}
          />
          <ChatBody contentIdx={clickedIdx}></ChatBody>
        </ChatBoard>
      )}
      <ChatButton onClick={onChatButtonClick}>
        {!isOpen ? '채팅' : '닫기'}
      </ChatButton>
    </ChatBackground>
  );
}

export default React.memo(Chat);
