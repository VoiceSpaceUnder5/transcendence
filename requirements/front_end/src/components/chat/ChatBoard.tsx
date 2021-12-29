import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import ChatMenu from './ChatMenu';
import ChatContent from './ChatContent';
import {selectMenu} from '../../modules/chatting';
import {RootState} from '../../modules';
import FriendList from './FriendList';
import ParticipatingChannel from './ParticipatingChannel';
import SearchChannel from './SearchChannel';
import CreateChannel from './CreateChannel';
import JoinChatting from './JoinChatting';
import Chatting from './Chatting';
import {useLazyQuery, gql} from '@apollo/client';

const ChatBoardStyles = styled.div<{isOpen: boolean}>`
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;

  ${props => !props.isOpen && `display: none;`}

  /* Size */
  width: 320px;
  height: 45vh;

  /* Background */
  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 8px;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(2%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & {
    animation: smoothAppear 0.5s ease-in-out;
  }
`;

const GET_NAME = gql`
  {
    me {
      id
    }
  }
`;

interface ChatBoardProps {
  isOpen: boolean;
}

export default function ChatBoard({isOpen}: ChatBoardProps): JSX.Element {
  const [getMe, {called, data}] = useLazyQuery(GET_NAME);
  const {menuIdx, channelId, isPrivate} = useSelector((state: RootState) => ({
    menuIdx: state.chatting.menuIdx,
    channelId: state.chatting.channelId,
    isPrivate: state.chatting.isPrivate,
  }));
  const dispatch = useDispatch();
  const onChatMenuClick = (idx: number) => dispatch(selectMenu(idx));
  const [element, setElement] = useState<JSX.Element | undefined>(undefined);
  useEffect(() => {
    getMe();
    if (called && data)
      switch (menuIdx) {
        case 0:
          setElement(<FriendList />);
          break;
        case 1:
          setElement(<ParticipatingChannel />);
          break;
        case 2:
          setElement(<SearchChannel />);
          break;
        case 3:
          setElement(<CreateChannel userId={data.me.id} />);
          break;
        case 4:
          setElement(
            <JoinChatting
              channelId={channelId as number}
              isPrivate={isPrivate as boolean}
            />,
          );
          break;
        case 5:
          setElement(<Chatting channelId={channelId as number} />);
          break;
      }
  }, [menuIdx]);
  return (
    <ChatBoardStyles isOpen={isOpen}>
      <ChatMenu onClick={onChatMenuClick} clickedIdx={menuIdx} />
      <ChatContent idx={menuIdx}>{element}</ChatContent>
    </ChatBoardStyles>
  );
}
