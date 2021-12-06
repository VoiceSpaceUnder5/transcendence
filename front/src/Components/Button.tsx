import React from 'react';

import {ReactNode} from 'react';
import styled, {css} from 'styled-components';

const StyledButton = styled.button<{
  bg?: string;
  brand?: boolean;
  icon?: boolean;
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

  /* Box */
  ${props => {
    return props.bg === 'dark'
      ? css`
          background: #343a40;
          border: 0px;
          border-radius: 4px;
          ${props.brand
            ? css`
                color: ${props.theme.brandText};
              `
            : css`
                color: ${props.theme.darkButtonText};
              `}
          &: hover {
            background-color: ${props.theme.darkButtonHover};
          }
        `
      : css`
          background-color: #ffffff;
          border: 0px;
          border-radius: 4px;
          &: hover {
            background-color: #fbfbfb;
          }
        `;
  }}
`;

interface ButtonProps {
  children?: ReactNode;
  bg?: string;
  brand?: boolean;
  icon?: boolean;
  onClick?: () => void;
}

function Button({children, bg, brand, icon}: ButtonProps): JSX.Element {
  return (
    <StyledButton bg={bg} brand={brand} icon={icon}>
      {children}
    </StyledButton>
  );
}

export default Button;
