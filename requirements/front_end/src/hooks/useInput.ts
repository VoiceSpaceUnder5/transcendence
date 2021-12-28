import React, {useCallback, useState} from 'react';

interface Inputs {
  imagePath?: string;
  id?: string;
  email?: string;
  password?: string;
  message?: string;
  description?: string;
}

export default function useInput(
  initialValue: Inputs,
): [Inputs, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void] {
  const [inputs, setInputs] = useState(initialValue);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setInputs(inputs => ({...inputs, [name]: value}));
    },
    [inputs],
  );
  const reset = useCallback(() => setInputs(initialValue), [initialValue]);
  return [inputs, onChange, reset];
}
