import React, {useCallback, useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {selectMenu} from '../../modules/chatting';
import ChannelOption from '../channel/ChannelOption';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import {RootState} from '../../modules';
import {gql, useMutation, useQuery} from '@apollo/client';
import {io, Socket} from 'socket.io-client';
import Div from '../common/Div';

export const GET_CHANNEL_DATA = gql`
  query getChannelData($channelId: ID!) {
    getChannelById(channelId: $channelId) {
      id
      name
      password
      messages {
        user {
          id
          name
        }
        textMessage
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      channelId
      user {
        id
        name
      }
      textMessage
    }
  }
`;

export default function Chatting(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const [meName] = useState(localStorage.getItem('meName'));
  const {channelId} = useSelector((state: RootState) => ({
    channelId: state.chatting.channelId,
  }));
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<
    {user: {id: number; name: string}; textMessage: string}[]
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
        channelId: channelId,
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
          if (socket) {
            socket.emit('sendToServer', {
              channelId: sendedMessage.channelId,
              userId: sendedMessage.user.id,
              name: sendedMessage.user.name,
              message: sendedMessage.textMessage,
            });
          }
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
    const socket = io(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_CHAT}${process.env.REACT_APP_BACKEND_DOMAIN}`,
    );
    socket.connect();
    setSocket(socket);
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
            user: {
              id: body.userId,
              name: '나',
            },
            textMessage: body.message,
          }),
        );
      } else {
        setMessages(messages =>
          messages.concat({
            user: {
              id: body.userId,
              name: body.name,
            },
            textMessage: body.message,
          }),
        );
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    refetch().then(data => {
      setMessages(data.data.getChannelById.messages);
    });
  }, []);

  if (loading) return <>로딩 중..</>;
  if (error) {
    console.log(error);
    return <>에러!</>;
  }
  return (
    <>
      <ChattingHeadStyles>
        <Div>{data.getChannelById.name}</Div>
        <ChannelOption
          meId={meId}
          channelId={channelId as string}
          channelName={data.getChannelById.name as string}
          channelPasswd={data.getChannelById.password as string}
        />
      </ChattingHeadStyles>
      <MessageBox meId={meId} messages={messages} />
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
