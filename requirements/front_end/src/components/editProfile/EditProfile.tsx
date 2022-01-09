import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import TitleDiv from '../common/TitleDiv';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import ImageUpload from './ImageUpload';
import {useLocation, useNavigate} from 'react-router-dom';
import useInput from '../../hooks/useInput';
import {useMutation, gql} from '@apollo/client';

const UPDATE_MY_PROFILE = gql`
  mutation UpdateUser($user_id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(user_id: $user_id, updateUserInput: $updateUserInput) {
      description
      profile_image
      profile_image_thumb
    }
  }
`;

export default function EditProfile(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(location.state.image);
  const [inputs, onChange] = useInput({
    description: location.state.description,
  });
  const isImgUpdated = useRef(false);
  const [updateMe, {error}] = useMutation(UPDATE_MY_PROFILE);

  const onClickConfirm = () => {
    if (isImgUpdated.current === true) {
      updateMe({
        variables: {
          user_id: location.state.id,
          updateUserInput: {
            description: inputs.description,
            profile_image_binary: image.substr(image.indexOf('base64') + 7),
          },
        },
        refetchQueries: ['getProfileImage'],
        update(cache) {
          cache.modify({
            fields: {},
          });
        },
      }).then(() => {
        isImgUpdated.current = false;
      });
    } else {
      updateMe({
        variables: {
          user_id: location.state.id,
          updateUserInput: {
            description: inputs.description,
          },
        },
      });
    }
    navigate('/profile');
  };

  const onImgChange = (img: string) => {
    isImgUpdated.current = true;
    setImage(img);
  };
  if (error) return <>에러..</>;
  return (
    <BackBoard size="hug">
      <TitleDiv>프로필 편집</TitleDiv>
      <WholeLayout>
        <InnerLayout>
          <Div>프로필 사진</Div>
          <ImageUpload image={image} onImgChange={onImgChange} />
        </InnerLayout>
        <InnerLayout>
          <Div>
            이름<span style={{fontSize: '10px'}}>(수정 불가)</span>
          </Div>
          <Div bg="light" width="large" align="center">
            {location.state.name}
          </Div>
          <Div>
            email<span style={{fontSize: '10px'}}>(수정 불가)</span>
          </Div>
          <Div bg="light" width="large" align="center">
            {location.state.email}
          </Div>
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
