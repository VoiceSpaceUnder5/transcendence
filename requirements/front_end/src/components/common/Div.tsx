import React from 'react';
import styled, {css} from 'styled-components';

const DivStyle = styled.div<{
  bg?: string;
  width?: string;
  align?: string;
  height?: string;
}>`
  display: flex;
  align-self: stretch;
  align-items: center;
  ${props => props.align === 'center' && `justify-content: center;`}
  // 매직넘버 어케 하징..
  ${props =>
    props.height === 'full' &&
    css`
      height: 182px;
      overflow-y: auto;
      align-items: flex-start;
      word-break: break-all;
    `} 

  /* font */
  font-style: normal;
  font-weight: 500;
  font-size: 100%;
  line-height: 19px;
  white-space: normal;

  background-color: ${props =>
    props.bg === 'light' ? props.theme.lightButtonBg : 'none'};
  border-radius: 4px;
  padding: 4px 0px;
`;

interface DivProps {
  children?: React.ReactNode;
  bg?: string;
  width?: string;
  align?: string;
  height?: string;
}

Div.defaultProps = {
  width: 'small',
};

export default function Div({
  children,
  bg,
  width,
  align,
  height,
}: DivProps): JSX.Element {
  return (
    <DivStyle bg={bg} width={width} align={align} height={height}>
      {children}
    </DivStyle>
  );
}
