import React, {ReactNode, useState} from 'react';
import styled, {css} from 'styled-components';

// interface BackBoardStyleProps = {
//   state: boolean
// }

const BackBoardStyle = styled.div<{
  color?: string;
  borderRadius?: string;
  margin?: string;
  width?: string;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props => (props.margin ? props.margin : '20px')};
  background-color: ${props =>
    props.color ? props.color : 'rgba(196, 196, 196, 0.8)'};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '0px')};
  width: ${props => (props.width ? props.width : '80%')};
  height: ${props => (props.height ? props.height : '100px')};
  max-height: 80%;
`;

interface BackBoardProps {
  children: ReactNode;
  borderRadius?: string;
  color?: string;
  margin?: string;
  width?: string;
  height?: string;
}
export default function BackBoard(props: BackBoardProps) {
  return (
    <BackBoardStyle
      margin={props.margin}
      color={props.color}
      borderRadius={props.borderRadius}
      width={props.width}
      height={props.height}
    >
      {props.children}
    </BackBoardStyle>
  );
}
