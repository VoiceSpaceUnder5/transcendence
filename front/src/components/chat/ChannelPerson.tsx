import React, {useState} from 'react';
import styled from 'styled-components';

const ChannelPersonStyles = styled.li`
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

interface ChannelPersonProps {
  imagePath: string;
  name: string;
}

export default function ChannelPerson({
  imagePath,
  name,
}: ChannelPersonProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);

  const onDivClick = () => !isClicked && setIsClicked(true);
  const onBtnClick = () => isClicked && setIsClicked(false);
  return (
    <ChannelPersonStyles onClick={onDivClick}>
      {!isClicked ? (
        <>
          <PersonImg src={imagePath} />
          <PersonName>{name}</PersonName>
        </>
      ) : (
        <>
          <button>친구 신청</button>
          <button onClick={onBtnClick}>뒤로</button>
        </>
      )}
    </ChannelPersonStyles>
  );
}
