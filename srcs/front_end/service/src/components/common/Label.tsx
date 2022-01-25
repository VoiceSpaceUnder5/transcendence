import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.label`
  /* font */
  font-style: normal;
  font-weight: 600;

  font-size: 100%;
  line-height: 19px;
  text-align: center;

  /* Auto Layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 6px 10px;

  /* Size */
  height: 31px;

  /* background-color */

  background: ${props => props.theme.greyButtonBg};
  color: ${props => props.theme.greyButtonText};
  &: hover {
    background-color: ${props => props.theme.greyButtonHover};
    transition: 0.5s;
  }
  border: 0px;
  border-radius: 4px;

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
`;

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

function Label({children, htmlFor}: LabelProps): JSX.Element {
  return <LabelStyle htmlFor={htmlFor}>{children}</LabelStyle>;
}

export default Label;
