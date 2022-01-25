import React from 'react';
import styled from 'styled-components';

const TitleDivStyle = styled.div<{color?: string}>`
  position: static;
  width: 91.53px;
  height: 24px;
  left: 207.23px;
  top: 30px;

  font-style: normal;
  font-weight: 600;
  font-size: 120%;
  line-height: 24px;
  text-align: center;

  color: ${props =>
    props.color === 'black' ? `${props.theme.lightButtonText};` : `#ffffff;`}

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 16px 0px;
`;

interface TitleDivProps {
  color?: string;
  children: React.ReactNode;
}

function TitleDiv({color, children}: TitleDivProps): JSX.Element {
  return <TitleDivStyle color={color}>{children}</TitleDivStyle>;
}

export default TitleDiv;
