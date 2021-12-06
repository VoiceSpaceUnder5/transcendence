import React, {ReactNode} from 'react';
import styled from 'styled-components';
import BackBoard from './BackBoard';

const UserVSInfoStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 15px;
  width: 100%;

  background: #ffffff;
  border: 1px solid #000000;

  /* Inside Auto Layout */
`;

interface UserVSInfoProps {
  imagePath: string;
}

export default function UserVSInfo(props: UserVSInfoProps) {
  console.log(props.imagePath);
  return (
    <BackBoard color="#FFFFFF" borderRadius="12.5px" margin="10px">
      <span
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <img style={{margin: '20px', width: '20%'}} src={props.imagePath} />
        <BackBoard
          color="#F0F0F0"
          height="70%"
          width="80%"
          borderRadius="10px"
          margin="10px"
        >
          <span>승패 관련 정보</span>
        </BackBoard>
      </span>
    </BackBoard>
  );
}
