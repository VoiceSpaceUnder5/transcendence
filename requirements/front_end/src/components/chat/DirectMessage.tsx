import React from 'react';
import {useDispatch} from 'react-redux';
import {createChannel, afterJoin} from '../../modules/chatting';
import {OptionButton} from '../common/Button';

interface DMProps {
  changeVisible: () => void;
}

export default function DirectMessages({changeVisible}: DMProps): JSX.Element {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createChannel());
    // 서버에 요청 보내서 없으면 방 생성하고 채널 아이디 받아서 afterJoin
    dispatch(afterJoin(4));
    changeVisible();
  };
  return <OptionButton onClick={onClick}>대화하기</OptionButton>;
}
