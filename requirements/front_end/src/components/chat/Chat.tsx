import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../../modules';
import {toggleChat, selectMenu} from '../../modules/chatting';
import ChatContent from './ChatContent';
import ChatMenu from './ChatMenu';

const GET_MY_NAME = gql`
  {
    getMe {
      id
      name
    }
  }
`;

export default React.memo(function Chat(): JSX.Element {
  const {loading, error, data} = useQuery(GET_MY_NAME);
  const {isOpen, menuIdx} = useSelector((state: RootState) => ({
    isOpen: state.chatting.isOpen,
    menuIdx: state.chatting.menuIdx,
  }));
  const dispatch = useDispatch();
  const onButtonClick = () => dispatch(toggleChat(isOpen));
  const onMenuClick = (idx: number) => dispatch(selectMenu(idx));

  if (error) return <>에러가 발생했습니다</>;
  return (
    <ChatBackground>
      {loading && <>로딩 중</>}
      {data && isOpen && (
        <ChatBoard>
          <ChatMenu onClick={onMenuClick} clickedIdx={menuIdx} />
          <ChatContent
            menuIdx={menuIdx}
            id={data.getMe.id}
            name={data.getMe.name}
          />
        </ChatBoard>
      )}
      <ChatButton onClick={onButtonClick}>
        {!isOpen ? '채팅' : '닫기'}
      </ChatButton>
    </ChatBackground>
  );
});

/* styles */
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

const ChatButton = styled.button`
  /* Text */
  font-style: normal;
  font-weight: 600;
  font-size: 100%;
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
    transition: 0.3s;
  }

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
    animation: smoothAppear 1s ease-in-out;
  }
`;
