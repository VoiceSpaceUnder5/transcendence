import React, {ReactNode, useState} from 'react';
import styled from 'styled-components';

// interface BackBoardStyleProps = {
//   state: boolean
// }

const BackBoardStyle = styled.div<{state: boolean}>`
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(196, 196, 196, 0.8);
  border-radius: 50px;
`;

interface BackBoardProps {
  children: ReactNode;
}
export default function BackBoard({children}: BackBoardProps) {
  const [state, setState] = useState(false);
  const onclick = () => {
    setState(!state);
    console.log(`state: ${state}`);
  };

  if (!children) {
    return <></>;
  }
  return <BackBoardStyle state={state}>{children}</BackBoardStyle>;
}
