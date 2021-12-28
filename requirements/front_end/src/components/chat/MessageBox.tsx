import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

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

interface MessageBoxProps {
  messages: string[];
}

export default React.memo(function MessageBox({
  messages,
}: MessageBoxProps): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      const scrollHeight = divRef.current.scrollHeight;
      divRef.current.scrollTo({
        top: scrollHeight - height,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <MessageBoxStyles ref={divRef}>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </MessageBoxStyles>
    </>
  );
});
