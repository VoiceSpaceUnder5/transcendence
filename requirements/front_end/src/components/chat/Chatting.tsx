import React, {useCallback, useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {selectMenu} from '../../modules/chatting';
import Div from '../common/Div';
import ChannelPeople from './ChannelPeople';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import {RootState} from '../../modules';
import {gql, useQuery} from '@apollo/client';
import {io, Socket} from 'socket.io-client';

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

const GET_CHANNEL_DATA = gql`
  query getChannelData($channelId: Int!) {
    getChannelById(channelId: $channelId) {
      name
      messages {
        textMessage
      }
      chatChannelUsers {
        id
      }
    }
  }
`;
interface ChattingProps {
  userId: number;
  name: string;
}

export default function Chatting({userId, name}: ChattingProps): JSX.Element {
  const {channelId} = useSelector((state: RootState) => ({
    channelId: state.chatting.channelId,
  }));
  const {loading, error, data} = useQuery(GET_CHANNEL_DATA, {
    variables: {
      channelId,
    },
  });
  const [socket] = useState<Socket>(io('http://api.ts.io:30000'));
  const [messages, setMessages] = useState<string[]>([]);
  const [{message}, onChange, reset] = useInput({message: ''});
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      socket.emit('sendToServer', {channelId, userId, name, message});
      reset();
    },
    [message],
  );

  const onBackClick = useCallback(
    (idx: number) => dispatch(selectMenu(idx)),
    [],
  );

  useEffect(() => {
    socket.emit('joinRoom', {channelId, userId, name}, (msg: string) =>
      console.log(msg),
    );
    socket.on('notice', body => console.log(body.message));
    socket.on('sendToClient', body => {
      if (body.userId === userId) {
        setMessages(messages => messages.concat(`나: ${body.message}`));
      } else {
        setMessages(messages =>
          messages.concat(`${body.name}: ${body.message}`),
        );
      }
    });
    return () => {
      socket.close();
    };
  }, []);
  if (loading) return <>로딩 중..</>;
  if (error) return <>에러!</>;
  // 이전 메시지들을 맨처음에 붙이는 작업도 필요

  return (
    <>
      <ChattingHead>
        <Div>{data.getChannelById.name}</Div>
        <ChannelPeople channelId={channelId as number} />
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
