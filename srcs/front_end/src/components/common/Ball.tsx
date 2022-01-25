import React, {useEffect} from 'react';
import styled from 'styled-components';

export default function Ball(): JSX.Element {
  const onClickCircle = () => {
    window.open('https://github.com/VoiceSpaceUnder5/transcendence');
  };
  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined;
    const button = document.getElementById('github-button');
    const radius = 25;
    let x = 12.5;
    let y = 12.5;
    let dx = 3;
    let dy = 3;
    if (button) {
      button.style.width = `${radius * 2}px`;
      button.style.height = `${radius * 2}px`;
      intervalId = setInterval(() => {
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        if (x + dx + radius < 0 || x + dx + radius > window.innerWidth) {
          if (dx > 0) {
            dx = -dx - 3;
          } else {
            dx = -dx + 3;
          }
        }
        if (y + dy + radius < 0 || y + dy + radius > window.innerHeight) {
          if (dy > 0) {
            dy = -dy - 3;
          } else {
            dy = -dy + 3;
          }
        }
        dx = dx > 40 ? 40 : dx;
        dx = dx < -40 ? -40 : dx;
        dy = dy > 40 ? 40 : dy;
        dy = dy < -40 ? -40 : dy;
        x += dx;
        y += dy;
      }, 16);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
  return (
    <BallStyle id="github-button" onClick={onClickCircle}>
      github
    </BallStyle>
  );
}

const BallStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.brandText};
  border-radius: 50%;
  border: 0px;

  position: absolute;
  left: 0px;
  right: 0px;
`;
