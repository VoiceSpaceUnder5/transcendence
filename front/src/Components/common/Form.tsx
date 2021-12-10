import React, {useState} from 'react';

// Form에서 받는 Props -> onSubmit 함수 (인자로 form :{...} 을 받는다.)
// form의 name은 문자, description은 문자
type MyFormProps = {
  onSubmit: (form: {name: string; description: string}) => void;
};

// onSubmit을 비구조할당하여 받고 type은 MyFormProps
function MyForm({onSubmit}: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  // form에서 name, description 비구조 할당
  const {name, description} = form;

  // e: any로 지정하고 마우스를 올라면 해당 이벤트의 type을 볼 수 있다.
  // onChange 함수가 실행되면 form의 name, description value 변경
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // e: any로 지정하고 마우스를 올라면 해당 이벤트의 type을 볼 수 있다.
  // handleSubmit이 발생하면 기존에 일어나던 이벤트를 없애고
  // form을 인자로 넣어 onSubmit 함수를 실행시킨다
  // form 초기화한다.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
