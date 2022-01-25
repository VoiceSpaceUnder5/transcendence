import React, {FormEvent} from 'react';

import {ReactNode} from 'react';
import styled, {css} from 'styled-components';

const TextStyle = styled.button<{
  bg?: string;
  large?: boolean;
  hidden?: boolean;
}>`
  /* Text */

  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  text-align: center;

  /* Auto Layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* Size */
  height: 31px;
  ${props => props.large && `width: 170px;`}

  /* background-color */
  ${props => {
    if (props.bg === 'grey') {
      return css`
        background: ${props.theme.greyTextBg};
        color: ${props.theme.greyTextBg};
      `;
    } else if (props.bg === 'white') {
      return css`
        background-color: ${props.theme.lightTextBg};
        color: ${props.theme.lightTextBg};
      `;
    }
  }}
  /* visibility */
  ${props => {
    if (props.hidden)
      return css`
        display: none;
      `;
    else
      return css`
        display: inline;
      `;
  }}

  border: 0px;
  border-radius: 4px;
`;

interface TextProps {
  children?: ReactNode;
  bg?: string;
  large?: boolean;
  onClick?: (e: FormEvent) => void;
  hidden?: boolean;
}

function Text({children, bg, large, onClick, hidden}: TextProps): JSX.Element {
  return (
    <TextStyle hidden={hidden} bg={bg} large={large} onClick={onClick}>
      {children}
    </TextStyle>
  );
}

export default Text;
