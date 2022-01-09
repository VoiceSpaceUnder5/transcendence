import React from 'react';
import {gql, useQuery} from '@apollo/client';
import styled, {css} from 'styled-components';

export const GET_PROFILE_IMAGE = gql`
  query getProfileImage($userId: Int!) {
    getUserById(user_id: $userId) {
      profile_image
      profile_image_thumb
    }
  }
`;

interface ImgProps {
  userId: number;
  size: string;
}

export default function Img({userId, size}: ImgProps): JSX.Element {
  // console.log(location.state.updateUser);
  const {loading, error, data} = useQuery(GET_PROFILE_IMAGE, {
    variables: {
      userId: userId,
    },
  });
  if (loading) return <>로딩 중</>;
  if (error) return <>에러</>;
  if (data) {
    console.log(data.getUserById.profile_image);
    console.log(data.getUserById.profile_image_thumb);
  }
  const src =
    size === 'navbar' || size === 'channel'
      ? data.getUserById.profile_image_thumb
      : data.getUserById.profile_image;
  return <ImgStyles size={size} src={src} loading="lazy"></ImgStyles>;
}

const ImgStyles = styled.img<{size: string}>`
  ${props => {
    switch (props.size) {
      case 'channel':
        return css`
          width: 20px;
          height: 20px;

          border-radius: 40%;
          margin-right: 4px;
        `;
      case 'navbar':
        return css`
          width: 32px;
          border-radius: 12px;
        `;
      case 'profile':
        return css`
          width: 288px;
          height: 288px;
          border-radius: 25px;
          border: 1px solid #000000;
        `;
    }
  }}
`;
