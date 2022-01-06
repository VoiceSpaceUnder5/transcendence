import React from 'react';
import styled, {css} from 'styled-components';

const InputStyle = styled.input.attrs(props => ({
  type: props.type && props.type,
}))`
  display: flex;
  align-self: center;
  justfiy-content: center;
  // 매직넘버 어케 하징..
  ${props => props.height === 'full' && `height: 182px; overflow-y: auto;`}

  /* font */
  font-style: normal;
  font-weight: 400;
  font-size: 100%;
  line-height: 16px;

  border-radius: 4px;
  padding: 4px 0px;
  border: 1px solid black;
  ${props =>
    props.type === 'file' &&
    css`
      width: 90%;
    `}
`;

interface InputProps {
  name?: string;
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
}

Input.defaultProps = {
  width: 'small',
};

export default function Input({
  name,
  height,
  onChange,
  value,
  type,
}: InputProps): JSX.Element {
  return (
    <InputStyle
      type={type}
      name={name}
      height={height}
      onChange={onChange}
      value={value}
    />
  );
}
