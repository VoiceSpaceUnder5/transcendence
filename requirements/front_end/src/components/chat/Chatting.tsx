import React, {useCallback, useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {selectMenu} from '../../modules/chatting';
import Div from '../common/Div';
import ChannelUsers from '../channel/ChannelUsers';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import {RootState} from '../../modules';
import {gql, useMutation, useQuery} from '@apollo/client';
import {io, Socket} from 'socket.io-client';

const GET_CHANNEL_DATA = gql`
  query getChannelData($channelId: Int!) {
    getChannelById(channelId: $channelId) {
      name
      messages {
        userId
        textMessage
      }
      chatChannelUsers {
        id
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      chatChannelId
      userId
      textMessage
    }
  }
`;

export default function Chatting(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const [meName] = useState(localStorage.getItem('meName'));
  const {channelId, role} = useSelector((state: RootState) => ({
    channelId: state.chatting.channelId,
    role: state.chatting.role,
  }));
  const [socket] = useState<Socket>(io('http://api.ts.io:30000'));
  const [userIds, setUserIds] = useState<number[]>([]);
  const [messages, setMessages] = useState<
    {userId: number; username?: string; textMessage: string}[]
  >([]);
  const [{message}, onChange, reset] = useInput({message: ''});
  const dispatch = useDispatch();

  const {loading, error, data, refetch} = useQuery(GET_CHANNEL_DATA, {
    variables: {
      channelId,
    },
  });

  const [sendMessage] = useMutation(CREATE_MESSAGE, {
    variables: {
      createMessageInput: {
        userId: meId,
        chatChannelId: channelId,
        textMessage: message,
      },
    },
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage()
        .then(data => {
          const sendedMessage = data.data.createMessage;
          socket.emit('sendToServer', {
            channelId: sendedMessage.chatChannelId,
            userId: sendedMessage.userId,
            name,
            message: sendedMessage.textMessage,
          });
          reset();
        })
        .catch(e => console.log(e));
    },
    [message],
  );

  const onBackClick = useCallback(
    (idx: number) => dispatch(selectMenu(idx)),
    [],
  );

  useEffect(() => {
    socket.emit(
      'joinRoom',
      {channelId, userId: meId, name: meName},
      (msg: string) => console.log(msg),
    );
    socket.on('notice', body => console.log(body.message));
    socket.on('sendToClient', body => {
      if (body.userId === meId) {
        setMessages(messages =>
          messages.concat({
            userId: body.userId,
            username: '나',
            textMessage: body.message,
          }),
        );
      } else {
        setMessages(messages =>
          messages.concat({
            userId: body.userId,
            username: body.username,
            textMessage: body.message,
          }),
        );
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    refetch().then(data => {
      const userIds = data.data.getChannelById.messages.map(
        (message: {userId: number}) => message.userId,
      );
      const uniqueArr = userIds.filter(
        (id: number, idx: number, self: number[]) => self.indexOf(id) === idx,
      );
      setUserIds(uniqueArr);
      setMessages(data.data.getChannelById.messages);
    });
  }, []);

  if (loading) return <>로딩 중..</>;
  if (error) return <>에러!</>;

  return (
    <>
      {/* 나가는 버튼도 추가해야 함 */}
      {/* <button>나가기</button> */}
      <ChattingHeadStyles>
        <Div>{data.getChannelById.name}</Div>
        <ChannelUsers
          meId={meId}
          channelId={channelId as number}
          role={role as string}
        />
      </ChattingHeadStyles>
      <MessageBox meId={meId} userIds={userIds} messages={messages} />
      <MessageForm
        message={message}
        onSubmit={onSubmit}
        onInputChange={onChange}
        onBackClick={onBackClick}
      />
    </>
  );
}

const ChattingHeadStyles = styled.div`
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
