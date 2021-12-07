import React, {ReactNode} from 'react';
import styled from 'styled-components';

const BackBoardStyle = styled.div<{width?: string; height?: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0px;

  width: ${props => (props.width ? props.width : '506px')};
  height: ${props => (props.height ? props.height : '')};

  /* Color / focus */

  background: rgba(196, 196, 196, 0.8);
  border-radius: 50px;
  margin: 12px; 12px;
`;

interface BackBoardProps {
  children: ReactNode;
  width?: string;
  height?: string;
}
export default function BackBoard(props: BackBoardProps): JSX.Element {
  return (
    <BackBoardStyle width={props.width} height={props.height}>
      {props.children}
    </BackBoardStyle>
  );
}
