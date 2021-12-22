import React from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import Button from '../common/Button';

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

export default function CreateChannel(): JSX.Element {
  const [{id, password}, onChange, reset] = useInput({
    id: '',
    password: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 백엔드에 방 생성 요청
    reset();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <input
          name="id"
          onChange={onChange}
          value={id}
          placeholder="채널 이름"
          required
        />
        <input
          type="password"
          name="password"
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
