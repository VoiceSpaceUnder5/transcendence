import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import TitleDiv from '../common/TitleDiv';
import Input from '../common/Input';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import ImageUpload from './ImageUpload';
import {useLocation, useNavigate} from 'react-router-dom';
import useInput from '../../hooks/useInput';
// import {useQuery, gql} from '@apollo/client';

// 쿼리 잘 넣어주자.
// const UPDATE_MY_PROFILE = gql`
//   updateMyProfile() {
//     name
//   }
// `;

const ProfileImgStyle = styled.img`
  width: 288px;
  height: 288px;
  border-radius: 25px;
  border: 1px solid #000000;
`;

const WholeLayout = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;

  margin-bottom: 16px;

  ${props => props.theme.padSize} {
    flex-direction: column;
  }
`;

const InnerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  width: 288px;
  margin: 0px 24px;
`;

export default function EditProfile(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClick, setIsClick] = useState(false);
  const [image, setImage] = useState('');

  const {imagePath, id, name, email, description} = location.state;
  const [inputs, onChange] = useInput({
    id: id,
    name: name,
    email: email,
    description: description,
  });

  const onClick = () => setIsClick(!isClick);
  useEffect(() => {
    setImage(imagePath);
  }, []);

  const onClickConfirm = () => {
    // const [onClickConfirm, {loading, error}] = useMutation(UPDATE_MY_PROFILE);
    // if (error) {
    //   console.error(error);
    // }
    // setLoading(loading);
    // // 사진 올리자.
    navigate('/profile');
  };
  return (
    <BackBoard size="hug">
      <TitleDiv>프로필 편집</TitleDiv>
      <WholeLayout>
        <InnerLayout>
          <Div>프로필 사진</Div>
          {!isClick ? (
            <ProfileImgStyle src={image} onClick={onClick}></ProfileImgStyle>
          ) : (
            <ImageUpload onClick={onClick} defaultImage={image} />
          )}
        </InnerLayout>
        <InnerLayout>
          <Div>이름</Div>
          <Input name="userId" onChange={onChange} value={inputs.name} />
          <Div>email</Div>
          <Input name="email" onChange={onChange} value={inputs.email} />
          <Div>자기소개</Div>
          <Textarea
            name="description"
            value={inputs.description as string}
            onChange={onChange}
          ></Textarea>
        </InnerLayout>
      </WholeLayout>
      <div
        style={{
          display: 'flex',
          width: '40%',
          justifyContent: 'space-evenly',
        }}
      >
        <Button onClick={onClickConfirm}>확인</Button>
        <Button onClick={() => navigate('/profile')}>취소</Button>
      </div>
    </BackBoard>
  );
}
