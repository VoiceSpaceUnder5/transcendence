import React, {useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {selectChatMenu} from '../../modules/chatting';
import Div from '../common/Div';
import Button from '../common/Button';

const ChattingHead = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 16px;
  margin-top: 2px;
  align-items: center;
  align-self: stretch;

  background-color: white;
  border-radius: 4px;
`;

const MessageBoxStyles = styled.div`
  display: flex;
  flex-direction: column;

  width: 96%;
  height: 100%;

  overflow-y: auto;
  background-color: ${props => props.theme.greyDivBg};
  border: 5px solid white;
  border-top: 0px;
  border-bottom: 0px;
`;

const MessageForm = styled.form`
  display: flex;
  width: 96%;
  padding: 4px;
  background-color: white;
`;

interface ChattingProps {
  id: number;
}

// 해당하는 채팅방의 고유한 id를 통해 채팅방 데이터를 fetching 해야 함.
export default function Chatting({id}: ChattingProps): JSX.Element {
  const [{message}, onChange, reset] = useInput({message: ''});
  // 이것도 서버에서 뿌려줄 것
  const [messages, setMessages] = useState<string[]>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    setMessages(messages.concat(message as string));
  };

  const dispatch = useDispatch();
  const onChatMenuClick = (idx: number) => dispatch(selectChatMenu(idx));
  return (
    <>
      <ChattingHead>
        <Div>채널 ID: {id}</Div>
      </ChattingHead>
      <MessageBoxStyles>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </MessageBoxStyles>
      <MessageForm onSubmit={onSubmit}>
        <input
          style={{width: '66%'}}
          name="message"
          value={message}
          onChange={onChange}
          required
        />
        <Button bg="dark">입력</Button>
        <Button bg="dark" type="button" onClick={() => onChatMenuClick(1)}>
          뒤로
        </Button>
      </MessageForm>
    </>
  );
}
