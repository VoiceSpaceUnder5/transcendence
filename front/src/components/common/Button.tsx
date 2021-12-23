import React, {FormEvent} from 'react';

import {ReactNode} from 'react';
import styled, {css} from 'styled-components';

const ButtonStyle = styled.button.attrs(props => ({
  type: props.type === 'submit' ? ('submit' as string) : ('button' as string),
}))<{
  bg?: string;
  brand?: boolean;
  icon?: boolean;
  left?: boolean;
  right?: boolean;
  large?: boolean;
}>`
  /* font */
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
  ${props => props.large && `width: 170px;`}

  /* background-color */
  ${props => {
    if (props.bg === 'dark') {
      return css`
        background: ${props.theme.darkButtonBg};
        color: ${props.theme.darkButtonText};
        &: hover {
          background-color: ${props.theme.darkButtonHover};
        }
      `;
    } else if (props.bg === 'grey') {
      return css`
        background: ${props.theme.greyButtonBg};
        color: ${props.theme.greyButtonText};
        &: hover {
          background-color: ${props.theme.greyButtonHover};
        }
      `;
    } else {
      return css`
        background-color: ${props.theme.lightButtonBg};
        color: ${props.theme.lightButtonText};
        &: hover {
          background-color: ${props.theme.lightButtonHover};
        }
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

interface ButtonProps {
  children?: ReactNode;
  bg?: string;
  brand?: boolean;
  icon?: boolean;
  left?: boolean;
  right?: boolean;
  large?: boolean;
  type?: string;
  onClick?: (e: FormEvent) => void;
}

function Button({
  children,
  bg,
  brand,
  icon,
  left,
  right,
  large,
  type,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <ButtonStyle
      bg={bg}
      brand={brand}
      icon={icon}
      left={left}
      right={right}
      large={large}
      onClick={onClick}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
}

export default Button;
