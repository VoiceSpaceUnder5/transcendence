import React, {FormEvent} from 'react';

import {ReactNode} from 'react';
import styled, {css} from 'styled-components';

const InputStyle = styled.input<{
  bg?: string;
  brand?: boolean;
  icon?: boolean;
  left?: boolean;
  right?: boolean;
  large?: boolean;
}>`
  /* Text */

  font-style: normal;
  font-weight: 600;
  ${props =>
    props.icon
      ? css`
          font-size: 24px;
        `
      : css`
          font-size: 16px;
        `}
  line-height: 19px;
  text-align: center;

  /* Auto Layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props =>
    props.icon
      ? css`
          padding: 0px 0px;
          margin: 0px;
        `
      : css`
          padding: 6px 10px;
        `}

  /* Size */
  height: 31px;
  ${props => props.large && `width: 170px; padding-left: 36px;`}

  /* background-color */
  ${props => {
    if (props.bg === 'dark') {
      return css`
        background: ${props.theme.darkInputBg};
        color: ${props.theme.darkInputText};
      `;
    } else if (props.bg === 'grey') {
      return css`
        background: ${props.theme.greyInputBg};
        color: ${props.theme.greyInputText};
      `;
    } else {
      return css`
        background-color: ${props.theme.lightInputBg};
        color: ${props.theme.lightInputText};
      `;
    }
  }}

  ${props =>
    props.brand &&
    css`
      color: ${props.theme.brandText};
    `}
  border: 0px;
  border-radius: 4px;
  ${props => props.left && `border-radius: 4px 0px 0px 4px;`}
  ${props => props.right && `border-radius: 0px 4px 4px 0px;`}
`;

interface InputProps {
  children?: ReactNode;
  bg?: string;
  brand?: boolean;
  icon?: boolean;
  left?: boolean;
  right?: boolean;
  large?: boolean;
  onChange?: (e: FormEvent) => void;
}

function Input({
  children,
  bg,
  brand,
  icon,
  left,
  right,
  large,
  onChange,
}: InputProps): JSX.Element {
  return (
    <InputStyle
      bg={bg}
      brand={brand}
      icon={icon}
      left={left}
      right={right}
      large={large}
      onChange={onChange}
    >
      {children}
    </InputStyle>
  );
}

export default Input;
