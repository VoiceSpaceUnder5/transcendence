import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ChannelPerson from './ChannelPerson';

const ChannelPeopleList = styled.ul`
  position: absolute;
  top: 80px;
  left: 45%;
  width: 152px;
  background-color: #dddddd;
  lists-tyle: none;
  padding: 4px;
  max-height: 68%;
  overflow-y: auto;
  border-radius: 8px;
`;

interface ChannelPeopleProps {
  channelId: number;
}

export default React.memo(function ChannelPeople({
  channelId,
}: ChannelPeopleProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const onClick = () => setVisible(!visible);
  console.log(`${channelId}로 채널에 있는 사람 조회`);
  const people = [
    {
      imagePath: './testImage.png',
      name: '길동길동길동길동길동길동길동길동길동길동길동길동길동길동',
    },
    {
      imagePath: './testImage.png',
      name: '길동',
    },
    {
      imagePath: './testImage.png',
      name: '길동',
    },
    {
      imagePath: './testImage.png',
      name: '길동',
    },
    {
      imagePath: './testImage.png',
      name: '길동',
    },
    {
      imagePath: './testImage.png',
      name: '길동',
    },
  ];

  return (
    <>
      <Button bg="dark" onClick={onClick}>
        {!visible ? `${people.length} 명` : '닫기'}
      </Button>
      {visible && (
        <ChannelPeopleList>
          {people.map((person, idx) => (
            <ChannelPerson
              key={idx}
              name={person.name}
              imagePath={person.imagePath}
            />
          ))}
        </ChannelPeopleList>
      )}
    </>
  );
});
