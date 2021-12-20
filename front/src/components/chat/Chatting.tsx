import React, {useState} from 'react';
import styled from 'styled-components';
import Input from '../common/Input';

const ChattingStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const ChattingHead = styled.div`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const MessageBoxStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: red;
`;

const ChattingFooter = styled.form`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 56px;
`;

// interface ChattingProps {
//   onBackButtonClick?: (idx: number) => void;
// }

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
  return (
    <ChattingStyles>
      <ChattingHead>
        <div>채널 이름</div>
        <button>뒤로</button>
      </ChattingHead>
      <MessageBoxStyles>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </MessageBoxStyles>
      <ChattingFooter onSubmit={onSubmit}>
        <Input value={input} onChange={onChange}></Input>
        <button>입력</button>
      </ChattingFooter>
    </ChattingStyles>
  );
}
