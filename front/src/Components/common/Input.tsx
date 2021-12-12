import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input<{
  height?: string;
}>`
  display: flex;
  align-self: stretch;
  // 매직넘버 어케 하징..
  ${props => props.height === 'full' && `height: 182px; overflow-y: auto;`}

  /* font */
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  border-radius: 4px;
  padding: 4px 0px;
  border: 1px solid black;
`;

interface InputProps {
  name?: string;
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

Input.defaultProps = {
  width: 'small',
};

export default function Input({
  name,
  height,
  onChange,
  value,
}: InputProps): JSX.Element {
  return (
    <InputStyle name={name} height={height} onChange={onChange} value={value} />
  );
}
