import React, {useEffect} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../modules';
import {loginSuccess, onLogin, loginFail} from '../modules/login';

export default function LoadingPage(): JSX.Element {
  const {isLogin} = useSelector((state: RootState) => ({
    isLogin: state.login.isLogin,
  }));
  const [cookies] = useCookies(['42accessToken']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCodeAndReq = () => {
    dispatch(onLogin());
    const child = window.open(
      'https://api.intra.42.fr/oauth/authorize?client_id=474cf772258dc9c00fb0984f0208b425b752f05208e9d150882f645b0437e2cf&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Freturn%2F&response_type=code',
    );
    if (child) {
      child.addEventListener('beforeunload', e => {
        e.preventDefault();
        console.log('자식 죽음');
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    const token = cookies['42accessToken'];
    const getUsers = async (token: string) => {
      if (isLogin === 2) return;
      try {
        const res = await axios.post(
          'http://192.168.219.100:30000/login/user',
          {
            token: token,
          },
        );
        console.log(res.data);
        dispatch(loginSuccess());
        navigate('/home');
      } catch (e) {
        console.log(e);
        dispatch(loginFail());
      }
    };

    if (token) getUsers(token);
    else getCodeAndReq();
  }, []);
  return <>로딩중</>;
}
