import React, {useState} from 'react';
import styled from 'styled-components';
import {gql, useMutation} from '@apollo/client';

const CREATE_RELATION = gql`
  mutation CreateRelation($createRelationInput: CreateRelationInput!) {
    createRelation(createRelationInput: $createRelationInput) {
      user_first_id
      user_second_id
      type {
        id
        label_korean
      }
    }
  }
`;

interface ChannelUserProps {
  meId: number;
  userId: number;
  imagePath?: string;
  name: string;
}

export default function ChannelUser({
  meId,
  userId,
  imagePath,
  name,
}: ChannelUserProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);
  const [createRelation] = useMutation(CREATE_RELATION, {
    variables: {
      createRelationInput: {
        user_first_id: meId,
        user_second_id: userId,
        typeId: 'RE1',
      },
    },
  });

  const onDivClick = () => !isClicked && setIsClicked(true);
  const onBtnClick = () => isClicked && setIsClicked(false);
  const onRelationClick = () => {
    createRelation();
  };
  return (
    <ChannelUserStyles onClick={onDivClick}>
      {!isClicked ? (
        <>
          <PersonImg src={imagePath} />
          <PersonName>{name}</PersonName>
        </>
      ) : (
        <>
          <button onClick={onRelationClick}>친구 신청</button>
          <button onClick={onBtnClick}>뒤로</button>
        </>
      )}
    </ChannelUserStyles>
  );
}

const ChannelUserStyles = styled.li`
  display: flex;

  padding: 4px;
  padding-right: 0px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PersonImg = styled.img`
  width: 20px;
  height: 20px;

  border-radius: 40%;
  margin-right: 4px;
`;

const PersonName = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
