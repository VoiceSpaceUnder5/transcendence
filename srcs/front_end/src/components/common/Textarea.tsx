import React, {ChangeEvent} from 'react';
import styled from 'styled-components';

const TextareaStyle = styled.textarea`
  /* font */
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 100%;
  line-height: 16px;

  width: 98%;
  border-radius: 4px;
  height: 182px;
`;

// name="description"
// value={description}
// onChange={onChange}

interface TextareaProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  name,
  value,
  onChange,
}: TextareaProps): JSX.Element {
  return (
    <TextareaStyle
      name={name}
      value={value}
      onChange={onChange}
      maxLength={100}
    />
  );
}
