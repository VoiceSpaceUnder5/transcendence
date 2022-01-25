import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components';

const BackBoardStyle = styled.div<{hidden?: boolean; size?: string}>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding-bottom: 16px;

  ${props => {
    if (props.size === 'medium') return `width: 360px;`;
  }}

  /* Color / focus */

  background: rgba(196, 196, 196, 0.8);
  border-radius: 50px;
  margin: 0px 12px;
  margin-bottom: 12px;
  ${props => {
    if (props.hidden)
      return css`
        display: none;
      `;
    else
      return css`
        display: flex;
      `;
  }}
`;

interface BackBoardProps {
  children: ReactNode;
  size?: string;
  hidden?: boolean;
}

BackBoard.defaultProps = {
  size: 'medium',
};

export default function BackBoard({
  children,
  size,
  hidden,
}: BackBoardProps): JSX.Element {
  return (
    <BackBoardStyle hidden={hidden} size={size}>
      {children}
    </BackBoardStyle>
  );
}
