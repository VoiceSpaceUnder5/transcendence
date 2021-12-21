import React, {useState} from 'react';
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

export default function Chatting(): JSX.Element {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('메시지 제출됨');
    setInput('');
    setMessages(messages.concat(input));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const dispatch = useDispatch();
  const onChatMenuClick = (idx: number) => dispatch(selectChatMenu(idx));
  return (
    <>
      <ChattingHead>
        <Div>채널 이름</Div>
      </ChattingHead>
      <MessageBoxStyles>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </MessageBoxStyles>
      <MessageForm onSubmit={onSubmit}>
        <input
          style={{width: '66%'}}
          value={input}
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
