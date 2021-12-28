import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';

const ProfileImgUploadStyle = styled.div`
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
  justify-content: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

interface ImageUploadProps {
  defaultImage: string;
  onClick: () => void;
}

export default function ImageUpload({onClick}: ImageUploadProps): JSX.Element {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  return (
    <ProfileImgUploadStyle>
      <ImageUploadForm onSubmit={onSubmit}>
        <Input type="file" onChange={onChange} />
        <div style={{display: 'flex', width: '40%'}}>
          <Button>확인</Button>
          <Button type="button" onClick={onClick}>
            취소
          </Button>
        </div>
      </ImageUploadForm>
    </ProfileImgUploadStyle>
  );
}
