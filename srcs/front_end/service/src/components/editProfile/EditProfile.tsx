import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import TitleDiv from '../common/TitleDiv';
import Div from '../common/Div';
import BackBoard from '../common/BackBoard';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import ImageUpload from './ImageUpload';
import {useLocation, useHistory} from 'react-router-dom';
import useInput from '../../hooks/useInput';
import {useMutation, gql} from '@apollo/client';
import {GET_PROFILE_IMAGE} from '../common/Img';

const UPDATE_MY_PROFILE = gql`
  mutation updateUser($user_id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(user_id: $user_id, updateUserInput: $updateUserInput) {
      description
      profile_image
      profile_image_thumb
    }
  }
`;

interface StateType {
  id: number;
  name: string;
  email: string;
  description: string;
  image: string;
}

export default function EditProfile(): JSX.Element {
  const history = useHistory();
  const state = useLocation().state as StateType;
  const [image, setImage] = useState(state.image);
  const [inputs, onChange] = useInput({
    description: state.description,
  });
  const isImgUpdated = useRef(false);
  const [updateMe, {error}] = useMutation(UPDATE_MY_PROFILE, {
    refetchQueries: [GET_PROFILE_IMAGE, 'getProfileImage'],
  });

  const onClickConfirm = () => {
    if (isImgUpdated.current === true) {
      updateMe({
        variables: {
          user_id: state.id,
          updateUserInput: {
            description: inputs.description,
            profile_image_binary: image.substr(image.indexOf('base64') + 7),
          },
        },
      }).then(() => {
        isImgUpdated.current = false;
        history.push('/profile');
      });
    } else {
      updateMe({
        variables: {
          user_id: state.id,
          updateUserInput: {
            description: inputs.description,
          },
        },
      }).then(() => history.push('/profile'));
    }
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
            {state.name}
          </Div>
          <Div>
            email<span style={{fontSize: '10px'}}>(수정 불가)</span>
          </Div>
          <Div bg="light" width="large" align="center">
            {state.email}
          </Div>
          <Div>자기소개</Div>
          <Textarea
            name="description"
            value={!inputs.description ? '' : inputs.description}
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
        <Button onClick={() => history.push('/profile')}>취소</Button>
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
