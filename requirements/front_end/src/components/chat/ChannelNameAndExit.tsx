import React, {useState} from 'react';
import Button from '../common/Button';
import Div from '../common/Div';

interface ChannelNameAndExitProps {
  channelName: string;
  channelId: number;
  meId: number;
  role: string;
}

export default function ChannelNameAndExit({
  channelName,
}: // channelId,
// meId,
// role,
ChannelNameAndExitProps): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const onClick = () => setToggle(!toggle);
  return (
    <Div>
      <Button onClick={onClick} bg="light">
        {channelName}
      </Button>
      {toggle && <Button bg="light">채널에서 나가기</Button>}
    </Div>
  );
}
