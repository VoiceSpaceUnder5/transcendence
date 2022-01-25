import React from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {logOut} from '../../modules/auth';
import Button from './Button';

// 이미 활성화 돼있으면 이미지 어디에 저장할지?
const ACT_TWO_FACTOR_AUTH = gql`
  mutation {
    activateTwoFactorAuth
  }
`;

const DEACT_TWO_FACTOR_AUTH = gql`
  mutation {
    deactivateTwoFactorAuth {
      twoFactorAuth
    }
  }
`;

const GET_2FA = gql`
  query {
    getMe {
      twoFactorAuth
      twoFactorAuthImageUri
    }
  }
`;

export default function LogOut(): JSX.Element {
  const {loading, error, data} = useQuery(GET_2FA);
  const [activateTwoFactorAuth] = useMutation(ACT_TWO_FACTOR_AUTH, {
    refetchQueries: [GET_2FA],
  });
  const [deactivateTwoFactorAuth] = useMutation(DEACT_TWO_FACTOR_AUTH, {
    refetchQueries: [GET_2FA],
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickLogout = () => {
    localStorage.removeItem('meId');
    localStorage.removeItem('meName');
    localStorage.clear();
    dispatch(logOut());
    history.push('/');
  };
  const onClickTwoFactorAuth = (twoFactorAuth: boolean) => {
    if (twoFactorAuth === false) {
      activateTwoFactorAuth();
    } else {
      deactivateTwoFactorAuth();
    }
  };
  if (loading) return <></>;
  if (error) return <>에러..</>;
  return (
    <Div>
      <Button bg="dark" onClick={onClickLogout}>
        LogOut
      </Button>
      {data.getMe.twoFactorAuth ? (
        <Button onClick={() => onClickTwoFactorAuth(data.getMe.twoFactorAuth)}>
          2단계 인증 비활성화
        </Button>
      ) : (
        <Button onClick={() => onClickTwoFactorAuth(data.getMe.twoFactorAuth)}>
          2단계 인증 활성화
        </Button>
      )}
      {data.getMe.twoFactorAuth && (
        <img src={data.getMe.twoFactorAuthImageUri}></img>
      )}
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;

  display: flex;
  flex-direction: column;

  ${props => props.theme.padSize} {
    top: 110px;
  }
`;
