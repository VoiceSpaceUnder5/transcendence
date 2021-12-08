import React, {ReactNode} from 'react';
import styled from 'styled-components';

const BackBoardStyle = styled.div<{size?: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding-bottom: 16px;

  ${props => {
    if (props.size === 'medium') return `width: 506px;`;
  }}

  /* Color / focus */

  background: rgba(196, 196, 196, 0.8);
  border-radius: 50px;
  margin: 0px 12px;
  margin-bottom: 12px;

  ${props => props.theme.mobileSize} {
    width: 90vw;
  }
`;

interface BackBoardProps {
  children: ReactNode;
  size?: string;
}

BackBoard.defaultProps = {
  size: 'medium',
};

export default function BackBoard({
  children,
  size,
}: BackBoardProps): JSX.Element {
  return <BackBoardStyle size={size}>{children}</BackBoardStyle>;
}
