import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {gql, useQuery} from '@apollo/client';
import MessageList from './MessageList';

const GET_USERS_BY_IDS = gql`
  query getUsersByIds($userIds: [Int!]!) {
    getUsersByIds(userIds: $userIds) {
      id
      name
    }
  }
`;

interface MessageBoxProps {
  meId: number;
  userIds: number[];
  messages: {userId: number; username?: string; textMessage: string}[];
}

export default React.memo(function MessageBox({
  meId,
  userIds,
  messages,
}: MessageBoxProps): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  const data = useQuery(GET_USERS_BY_IDS, {
    variables: {
      userIds,
    },
  });
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

  if (data.loading) return <>로딩 중</>;
  if (data.error) return <>에러</>;
  return (
    <>
      <MessageBoxStyles ref={divRef}>
        {messages.map((message, idx) => (
          <div key={idx}>
            {data.data.getUsersByIds.find(
              (obj: {id: number; name: string}) => obj.id === meId,
            )
              ? '나'
              : data.data.getUsersByIds.find(
                  (obj: {id: number; name: string}) => obj.id === meId,
                ).name}
            : {message.textMessage}
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
