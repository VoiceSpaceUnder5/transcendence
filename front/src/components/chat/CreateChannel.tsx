import React from 'react';
import useInput from '../../hooks/useInput';

export default function CreateChannel(): JSX.Element {
  const [{id, password}, onChange, reset] = useInput({
    id: '',
    password: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="id" value={id} onChange={onChange} />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
      />
      <button>만들기</button>
    </form>
  );
}
