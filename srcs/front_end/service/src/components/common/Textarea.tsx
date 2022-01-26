import React, {ChangeEvent} from 'react';
import styled from 'styled-components';

const TextareaStyle = styled.textarea<{name: string}>`
  /* font */
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 100%;
  line-height: 16px;

  width: 98%;
  border-radius: 4px;
  ${props => {
    if (props.name === 'description') return `height: 182px;`;
    else if (props.name === 'name') return `height: 27px;`;
    else return `height: 27px;`;
  }}
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
