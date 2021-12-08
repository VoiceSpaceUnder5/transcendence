import React, {ReactNode} from 'react';
import styled from 'styled-components';

const FriendStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 15px;
  margin-bottom: 8px;
  width: inherit;

  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 12.5px;
`;

const ProfileImageStyle = styled.img`
  width: 47px;
  height: 47px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 15px;
`;

const FlexBox = styled.div`
  display: flex;
  width: 80%;
`;

interface FriendProps {
  imagePath: string;
  children: ReactNode;
}

export default function Friend(props: FriendProps): JSX.Element {
  return (
    <FriendStyle>
      <ProfileImageStyle src={props.imagePath} />
      <FlexBox>{props.children}</FlexBox>
    </FriendStyle>
  );
}
