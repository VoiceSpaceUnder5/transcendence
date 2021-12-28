import React from 'react';
import styled from 'styled-components';

const ProfileImgUploadStyle = styled.div`
  position: absolute;
  margin-top: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 288px;
  height: 288px;
  border-radius: 25px;
  background-color: rgba(50, 50, 50, 0.1);
`;

const ImageUploadForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ImageUpload(): JSX.Element {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <ProfileImgUploadStyle>
      <ImageUploadForm onSubmit={onSubmit}>
        <input type="file" style={{backgroundColor: 'white'}}></input>
        <button>이미지 업로드</button>
      </ImageUploadForm>
    </ProfileImgUploadStyle>
  );
}
