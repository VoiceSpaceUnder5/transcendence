import {gql, useMutation} from '@apollo/client';
import React from 'react';
import useInput from '../../hooks/useInput';
import {GET_CHANNEL_DATA} from '../chat/Chatting';
import Button from '../common/Button';

const UPDATE_CHANNEL_NAME = gql`
  mutation updateChannel($input: UpdateChannelInput!, $channelId: ID!) {
    updateChannel(updateChannelInput: $input, channelId: $channelId) {
      name
    }
  }
`;

interface ChannelSettingProps {
  onBack: () => void;
  channelId: string;
  channelName: string;
  channelPasswd: string;
}

export default function ChannelSetting({
  onBack,
  channelId,
}: ChannelSettingProps): JSX.Element {
  const [inputs, onChange, reset] = useInput({
    name: '',
    password: '',
  });
  const [updateChannelName] = useMutation(UPDATE_CHANNEL_NAME);
  const onClickNameChange = () => {
    updateChannelName({
      variables: {
        channelId: channelId,
        input: {
          name: inputs.name,
        },
      },
      refetchQueries: [GET_CHANNEL_DATA],
    });
    reset();
  };
  const onClickPasswordChange = () => {
    updateChannelName({
      variables: {
        channelId: channelId,
        input: {
          password: inputs.password,
          typeId: inputs.password === '' ? 'CT2' : 'CT1',
        },
      },
      refetchQueries: [GET_CHANNEL_DATA],
    });
    reset();
  };
  const preventEnterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Button bg="grey" onClick={onBack}>
        {'<'}
      </Button>
      <div>방 이름</div>
      <form
        style={{display: 'flex', width: '100%'}}
        onSubmit={preventEnterSubmit}
      >
        <input
          name="name"
          value={inputs.name}
          onChange={onChange}
          style={{width: '60%'}}
          required
          autoComplete="off"
          placeholder="새 채널 이름을 입력하세요"
        />
        <Button onClick={onClickNameChange}>변경</Button>
      </form>
      <div>비밀번호</div>
      <form
        style={{display: 'flex', width: '100%'}}
        onSubmit={preventEnterSubmit}
      >
        <input
          name="password"
          type="password"
          value={inputs.password}
          onChange={onChange}
          style={{width: '60%'}}
          required
          autoComplete="off"
          placeholder="새 비밀번호를 입력하세요"
        />
        <Button onClick={onClickPasswordChange}>변경</Button>
      </form>
    </>
  );
}
