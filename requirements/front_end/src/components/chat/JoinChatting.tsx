import React, {FormEvent, useEffect} from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useDispatch} from 'react-redux';
import {afterJoin, selectMenu} from '../../modules/chatting';
import Div from '../common/Div';
import Button from '../common/Button';

interface ChattingProps {
  channelId: number;
  isPrivate: boolean;
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

export default function JoinChatting({
  channelId,
  isPrivate,
}: ChattingProps): JSX.Element {
  const dispatch = useDispatch();
  const [{password}, onChange, reset] = useInput({password: ''});
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 유효성 검사
    // 성공하면 방으로 이동
    dispatch(afterJoin(channelId));
    reset();
  };
  const onClick = () => dispatch(selectMenu(2));

  useEffect(() => {
    if (isPrivate === false) dispatch(afterJoin(channelId));
  }, []);

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