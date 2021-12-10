import React, {useState} from 'react';

interface FormProps {
  formSubmit: (value: string) => void;
}

export default function Form({formSubmit}: FormProps): JSX.Element {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmit(value);
    setValue('');
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="name" value={value} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
    </>
  );
}
