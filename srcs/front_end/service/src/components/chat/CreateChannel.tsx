import React, {useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import Button from '../common/Button';
import {useDispatch} from 'react-redux';
import {afterJoin} from '../../modules/chatting';
import {useMutation, gql} from '@apollo/client';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 4%;
  height: 30%;
  width: 96%;
  padding: 4px;
`;

const CREATE_CHANNEL = gql`
  mutation CreateChannel(
    $createChannelInput: CreateChannelInput!
    $userId: Int!
  ) {
    createChannel(createChannelInput: $createChannelInput, userId: $userId) {
      id
      name
    }
  }
`;

// 방 생성에 성공하면 바로 채팅방으로 이동
export default function CreateChannel(): JSX.Element {
  const [meId] = useState(Number(localStorage.getItem('meId')));
  const [{name, password}, onChange, reset] = useInput({
    name: '',
    password: '',
  });
  const [createChannel] = useMutation(CREATE_CHANNEL, {
    variables: {
      userId: meId,
      createChannelInput: {
        name,
        typeId: password === '' ? 'CT2' : 'CT1',
        password: password,
      },
    },
  });
  const dispatch = useDispatch();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 백엔드에 방 생성 요청해서 방 번호 받으면 afterJoin 액션 실행
    createChannel().then(data => {
      const {createChannel} = data.data;
      dispatch(afterJoin(createChannel.id));
      reset();
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <input
          name="name"
          onChange={onChange}
          value={name}
          placeholder="채널 이름"
          required
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          onChange={onChange}
          value={password}
          placeholder="비밀번호(비공개 채널)"
        />
        <Button bg="grey" type="submit">
          만들기
        </Button>
      </Form>
    </>
  );
}
