import {gql, useMutation} from '@apollo/client';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../modules';
import {createChannel, afterJoin} from '../../modules/chatting';
import {OptionButton} from '../common/Button';

const DM = gql`
  mutation directMessage($meId: Int!, $userId: Int!) {
    joinDirectChannel(otherUserId: $userId, userId: $meId) {
      id
    }
  }
`;

interface DMProps {
  changeVisible: () => void;
  meId: number;
  userId: number;
}

export default function DirectMessages({
  changeVisible,
  meId,
  userId,
}: DMProps): JSX.Element {
  const {menuIdx} = useSelector((state: RootState) => ({
    menuIdx: state.chatting.menuIdx,
  }));
  const [directMessage] = useMutation(DM, {
    variables: {
      meId,
      userId,
    },
  });
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createChannel());
    directMessage()
      .then(data => {
        if (menuIdx === 5) {
          changeVisible();
        }
        const {id} = data.data.joinDirectChannel;
        dispatch(afterJoin(id));
      })
      .catch(console.log);
  };
  return <OptionButton onClick={onClick}>대화하기</OptionButton>;
}
