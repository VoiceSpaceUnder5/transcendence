import React, {FormEvent, useState} from 'react';
// import styled from 'styled-components';

// const CreateChannelStyles = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

export default function CreateChannel(): JSX.Element {
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 제출
  };

  return (
    <form>
      <input name="id" value={inputs.id} onChange={onChange} />
      <input
        name="password"
        value={inputs.password}
        onChange={onChange}
        type="password"
      />
      <button onSubmit={onSubmit}>만들기</button>
      <button type="button">취소</button>
    </form>
  );
}
