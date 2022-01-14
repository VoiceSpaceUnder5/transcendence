import React, {FormEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';
import {afterJoin, selectMenu} from '../../modules/chatting';
import Div from '../common/Div';
import Button from '../common/Button';
import {RootState} from '../../modules';
import {gql, useMutation} from '@apollo/client';

const JOIN_CHATTING = gql`
  mutation joinChannel($input: JoinChannelInput!) {
    joinChannel(joinChannelInput: $input)
  }
`;

// 채팅방이 비공개방이면 비밀번호를 요구하고, 그렇지 않으면 자동으로 채팅방 안으로 이동
export default function JoinChatting(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const {channelId, isPrivate} = useSelector((state: RootState) => ({
    channelId: state.chatting.channelId,
    isPrivate: state.chatting.isPrivate,
  }));
  const dispatch = useDispatch();
  const [{password}, onChange, reset] = useInput({password: ''});
  const [joinChatting] = useMutation(JOIN_CHATTING, {
    variables: {
      input: {
        channelId: channelId,
        userId: meId,
        password: password,
      },
    },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToChatting();
    reset();
  };
  const onClick = () => dispatch(selectMenu(2));
  useEffect(() => {
    if (isPrivate === false) {
      goToChatting();
    }
  }, []);

  const goToChatting = async () => {
    const data = await joinChatting();
    const {joinChannel} = data.data;
    if (joinChannel === true) {
      dispatch(afterJoin(channelId as number));
    } else {
      alert('비밀번호가 틀렸습니다');
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Div align="center">비공개 방입니다</Div>
      <Div align="center">비밀번호를 입력하세요</Div>
      <input
        type="password"
        name="password"
        autoComplete="off"
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
