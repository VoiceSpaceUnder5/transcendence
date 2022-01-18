import React from 'react';
import {useHistory} from 'react-router-dom';

export default function SpectatingButton(): JSX.Element {
  const history = useHistory();
  const onClick = () => {
    history.push('/spectating');
  };
  return <button onClick={onClick}>관전하기</button>;
}
