import React, {FormEvent, useEffect} from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';
import {afterJoin, selectMenu} from '../../modules/chatting';
import Div from '../common/Div';
import Button from '../common/Button';
import {RootState} from '../../modules';
import {gql, useMutation} from '@apollo/client';

const JOIN_CHATTING = gql`
  mutation createChatChannelUser(
    $createChatChannelUserInput: CreateChatChannelUserInput!
  ) {
    createChatChannelUser(
      createChatChannelUserInput: $createChatChannelUserInput
    ) {
      chatChannelId
    }
  }
`;

interface JoinChattingProps {
  userId: number;
}

// eslint-disable-next-line
export default function JoinChatting({userId}: JoinChattingProps): JSX.Element {
  const {channelId, isPrivate} = useSelector((state: RootState) => ({
    channelId: state.chatting.channelId,
    isPrivate: state.chatting.isPrivate,
  }));
  const dispatch = useDispatch();
  const [{password}, onChange, reset] = useInput({password: ''});
  const [joinChatting] = useMutation(JOIN_CHATTING, {
    variables: {
      createChatChannelUserInput: {
        chatChannelId: channelId,
        userId,
        roleId: 'UR2',
        // 패스워드도 보내야할듯?
      },
    },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 유효성 검사는 백에서 해야할듯?
    goToChatting();
    reset();
  };
  const onClick = () => dispatch(selectMenu(2));
  useEffect(() => {
    if (isPrivate === false) {
      goToChatting();
    }
  }, []);

  const goToChatting = () => {
    joinChatting().then(data => {
      const {createChatChannelUser} = data.data;
      // 여기서 패스워드랑 비교해서 다르면 fail같은 거 리턴 받아서 조건분기 해야할듯?
      dispatch(afterJoin(createChatChannelUser.chatChannelId));
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Div align="center">비공개 방입니다</Div>
      <Div align="center">비밀번호를 입력하세요</Div>
      <input
        type="password"
        name="password"
        onChange={onChange}
        value={password}
      />
      <Buttons>
        <Button bg="grey" type="submit">
          입장
        </Button>
        <Button bg="grey" type="button" onClick={onClick}>
          뒤로
        </Button>
      </Buttons>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 4%;
  height: 20%;
  width: 96%;
  padding: 4px;
`;

const Buttons = styled.div`
  display: flex;
  width: 32%;
  justify-content: space-between;
  padding-top: 8px;
  display: flex;
`;
