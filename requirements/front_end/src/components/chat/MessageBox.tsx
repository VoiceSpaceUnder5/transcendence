import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';

interface MessageBoxProps {
  meId: number;
  messages: {user: {id: number; name: string}; textMessage: string}[];
}

export default React.memo(function MessageBox({
  meId,
  messages,
}: MessageBoxProps): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      const scrollHeight = divRef.current.scrollHeight;
      divRef.current.scrollTo({
        top: scrollHeight - height,
      });
    }
  };

  return (
    <>
      <MessageBoxStyles ref={divRef}>
        {messages.map((message, idx) => (
          <div key={idx}>
            {message.user.id === meId ? '나' : message.user.name} :{' '}
            {message.textMessage}
          </div>
        ))}
        <MessageList meId={meId} />
      </MessageBoxStyles>
    </>
  );
});

const MessageBoxStyles = styled.div`
  display: flex;
  flex-direction: column;

  width: 96%;
  height: 100%;

  overflow-y: auto;
  background-color: ${props => props.theme.greyDivBg};
  border: 5px solid white;
  border-top: 0px;
  border-bottom: 0px;
`;
