import {gql, useMutation} from '@apollo/client';
import React from 'react';
import useInput from '../../hooks/useInput';
import {GET_CHANNEL_DATA} from '../chat/Chatting';
import Button from '../common/Button';

const UPDATE_CHANNEL = gql`
  mutation updateChannel($input: CreateChannelInput!, $channelId: Int!) {
    updateChannel(updateChannelInput: $input, channelId: $channelId) {
      name
    }
  }
`;

interface ChannelSettingProps {
  onBack: () => void;
  channelId: number;
  channelName: string;
  channelPasswd: string;
}

export default function ChannelSetting({
  onBack,
  channelId,
  channelName,
  channelPasswd,
}: ChannelSettingProps): JSX.Element {
  const [inputs, onChange, reset] = useInput({
    name: channelName,
    password: channelPasswd,
  });
  const [updateChannel] = useMutation(UPDATE_CHANNEL);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateChannel({
      variables: {
        channelId: channelId,
        input: {
          name: inputs.name,
          password: inputs.password,
          typeId: inputs.password === '' ? 'CT2' : 'CT1',
        },
      },
      refetchQueries: [GET_CHANNEL_DATA],
    });
    reset();
  };
  return (
    <>
      <Button bg="grey" onClick={onBack}>
        {'<'}
      </Button>
      <form onSubmit={onSubmit}>
        <div>방 이름</div>
        <input name="name" value={inputs.name} onChange={onChange} />
        <div>비밀번호</div>
        <input name="password" value={inputs.password} onChange={onChange} />
        <Button type="submit">변경</Button>
      </form>
    </>
  );
}
