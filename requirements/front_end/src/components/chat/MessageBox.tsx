import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {gql, useQuery} from '@apollo/client';

const GET_RELATIONS = gql`
  query getRelations($userId: Float!) {
    getRelationsByUserIdTreatAsFirst(userId: $userId) {
      user_second_id
      typeId
    }
  }
`;

interface MessageBoxProps {
  meId: number;
  messages: {user: {id: number; name: string}; textMessage: string}[];
}

export default React.memo(function MessageBox({
  meId,
  messages,
}: MessageBoxProps): JSX.Element {
  const {loading, error, data} = useQuery(GET_RELATIONS, {
    variables: {
      userId: meId,
    },
  });
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

  if (loading) return <>로딩 중..</>;
  if (error) return <>에러..</>;
  return (
    <>
      <MessageBoxStyles ref={divRef}>
        {messages.map((message, idx) => {
          const relations = data.getRelationsByUserIdTreatAsFirst;
          const typeId = relations.find(
            (relation: {user_second_id: number; typeId: string}) =>
              relation.user_second_id === message.user.id,
          )?.typeId;
          if (typeId === 'RE3' || typeId === 'RE4' || typeId === 'RE5') {
            return null;
          } else {
            return (
              <div key={idx}>
                {message.user.id === meId ? '나' : message.user.name} :
                {message.textMessage}
              </div>
            );
          }
        })}
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
