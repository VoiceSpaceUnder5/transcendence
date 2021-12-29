import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const MessageFormStyles = styled.form`
  display: flex;
  width: 96%;
  padding: 4px;
  background-color: white;
`;

interface MessageFormProps {
  message: string | undefined;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBackClick: (idx: number) => void;
}

export default React.memo(function MessageForm({
  message,
  onSubmit,
  onInputChange,
  onBackClick,
}: MessageFormProps): JSX.Element {
  return (
    <MessageFormStyles onSubmit={onSubmit}>
      <input
        autoComplete="off"
        style={{width: '64%'}}
        name="message"
        value={message}
        onChange={onInputChange}
        required
      />
      <Button bg="dark" type="submit">
        입력
      </Button>
      <Button bg="dark" type="button" onClick={() => onBackClick(1)}>
        뒤로
      </Button>
    </MessageFormStyles>
  );
});
