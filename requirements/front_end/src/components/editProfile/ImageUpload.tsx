import React from 'react';
import styled from 'styled-components';
import Label from '../common/Label';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  image: string;
  onImgChange: (img: string) => void;
}

export default function ImageUpload({
  image,
  onImgChange,
}: ImageUploadProps): JSX.Element {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].type.indexOf('image/') === -1) {
        alert('파일 형식이 잘못되었습니다.');
        return;
      }
      imageCompressAndSend(e.target.files[0]);
    }
  };

  const imageCompressAndSend = async (fileSrc: File) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 288,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      // https://kyounghwan01.github.io/blog/React/image-upload/#formdata-%E1%84%92%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC
      const compressedFile = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        // 변환 완료!
        onImgChange(reader.result as string);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileImgUploadStyle style={{backgroundImage: `url(${image})`}}>
      <ImageUploadForm onSubmit={onSubmit}>
        <Label htmlFor="input-file">업로드</Label>
        <input
          type="file"
          id="input-file"
          style={{display: 'none'}}
          onChange={onChange}
        />
      </ImageUploadForm>
    </ProfileImgUploadStyle>
  );
}

const ProfileImgUploadStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 288px;
  height: 288px;
  border-radius: 25px;
  background-size: 288px 288px;
`;

const ImageUploadForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
