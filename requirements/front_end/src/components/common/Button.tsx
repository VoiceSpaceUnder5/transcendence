import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components';

export const OptionButton = styled.button`
  width: 40%;
  white-space: nowrap;
  height: 40px;
  margin: 16px 8px;
  padding: 8px;
  background-color: #bbbbbb;
  border: 0px;
  border-radius: 8px;

  &: hover {
    background-color: #cccccc;
    transition: 0.2s;
  }
`;

const ButtonStyle = styled.button.attrs(props => ({
  type: props.type === 'submit' ? ('submit' as string) : ('button' as string),
}))<{
  bg?: string;
  brand?: boolean;
  icon?: boolean;
  left?: boolean;
  right?: boolean;
  large?: boolean;
  ani?: boolean;
}>`
  /* font */
  font-style: normal;
  font-weight: 600;
  ${props =>
    props.icon
      ? css`
          font-size: 150%;
        `
      : css`
          font-size: 100%;
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
          transition: 0.5s;
        }
      `;
    } else if (props.bg === 'grey') {
      return css`
        background: ${props.theme.greyButtonBg};
        color: ${props.theme.greyButtonText};
        &: hover {
          background-color: ${props.theme.greyButtonHover};
          transition: 0.5s;
        }
      `;
    } else {
      return css`
        background-color: ${props.theme.lightButtonBg};
        color: ${props.theme.lightButtonText};
        &: hover {
          background-color: ${props.theme.lightButtonHover};
          transition: 0.5s;
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

  ${props =>
    props.ani !== false &&
    css`
      @keyframes smoothAppear {
        from {
          opacity: 0.7;
        }
        to {
          opacity: 1;
        }
      }

      & {
        animation: smoothAppear 0.5s ease-in-out;
      }
    `}
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
  ani?: boolean;
  onClick?: () => void;
  onHover?: () => void;
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
  ani,
  onClick,
  onHover,
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
      onMouseOver={onHover}
      onMouseLeave={onHover}
      type={type}
      ani={ani}
    >
      {children}
    </ButtonStyle>
  );
}

export default Button;
