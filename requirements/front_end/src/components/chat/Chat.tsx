import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../../modules';
import {toggleChat} from '../../modules/chatting';
import ChatBoard from './ChatBoard';

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

export default function Chat(): JSX.Element {
  // const [isOpen, setisOpen] = useState(false);
  // const onClick = () => {
  //   setisOpen(!isOpen);
  // };
  const {isOpen} = useSelector((state: RootState) => ({
    isOpen: state.chatting.isOpen,
  }));
  const dispatch = useDispatch();
  const onClick = () => dispatch(toggleChat(isOpen));

  return (
    <ChatBackground>
      <ChatBoard isOpen={isOpen} />
      <ChatButton onClick={onClick}>{!isOpen ? '채팅' : '닫기'}</ChatButton>
    </ChatBackground>
  );
}
