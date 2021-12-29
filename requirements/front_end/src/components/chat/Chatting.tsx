import React, {useCallback, useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {selectMenu} from '../../modules/chatting';
import Div from '../common/Div';
import ChannelPeople from './ChannelPeople';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import {io} from 'socket.io-client';

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

interface ChattingProps {
  channelId: number;
}

// 해당하는 채팅방의 고유한 id를 통해 채팅방 데이터를 fetching 해야 함.
export default function Chatting({channelId}: ChattingProps): JSX.Element {
  // useLazyQuery로 함수 만들어놓고 useEffect 안에서 data fetch?
  // const [socket] = useState(io('http://192.168.2.242:8080'));
  const [messages, setMessages] = useState<string[]>([]);
  const [{message}, onChange, reset] = useInput({message: ''});
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // socket.emit(
      //   'sendToServer',
      //   {channelId, name: '돌쇠', message: message},
      //   // (msg: string) => setMessages(messages.concat(msg)),
      // );
      reset();
    },
    [message],
  );

  const onBackClick = useCallback(
    (idx: number) => dispatch(selectMenu(idx)),
    [],
  );

  useEffect(() => {
    // data fetch 해오기?
    // 그리고 socket에 메시지 날리기?
    // socket.emit('joinRoom', {channelId}, (msg: string) => console.log(msg));
    // socket.on('notice', data => console.log(data.message));
    // socket.on('sendToClient', msg => {
    //   setMessages(messages => messages.concat(msg));
    // });
  }, []);
  return (
    <>
      <ChattingHead>
        <Div>채널 이름 예정: {channelId}</Div>
        <ChannelPeople channelId={channelId} />
      </ChattingHead>
      <MessageBox messages={messages} />
      <MessageForm
        message={message}
        onSubmit={onSubmit}
        onInputChange={onChange}
        onBackClick={onBackClick}
      />
    </>
  );
}
