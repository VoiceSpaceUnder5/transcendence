import React, {ReactNode, useState} from 'react';
import styled, {css} from 'styled-components';

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
  children: ReactNode[];
}
export default function BackBoard({children}: BackBoardProps) {
  const [state, setState] = useState(false);
  const onclick = () => {
    setState(!state);
    console.log(`state: ${state}`);
  };
  return (
    <BackBoardStyle state={state}>
      {children.map((child, index) => {
        return <div key={index}>{child}</div>;
      })}
      <button onClick={onclick}>button</button>
    </BackBoardStyle>
  );
}
