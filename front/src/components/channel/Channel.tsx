import React, {useState} from 'react';
import styled from 'styled-components';
import ChannelInfoList from './ChannelInfoList';
import ChannelInfo from './ChannelInfo';

const ChannelStyles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 15px;
  margin-bottom: 8px;
  width: inherit;

  background-color: ${props => props.theme.lightButtonBg};
  border-radius: 12.5px;

  ${props => props.theme.padSize} {
    width: 90%;
  }

  &: hover {
    background-color: red;
  }
`;

interface ChannelProps {
  id: number;
  name: string;
  number: number;
  isPrivate: boolean;
  isJoin?: boolean;
  onClick?: (id: number, isPrivate: boolean) => void;
}

export default function Channel({
  id,
  name,
  number,
  isPrivate,
  isJoin,
}: ChannelProps): JSX.Element {
  const [isClick, setIsClick] = useState(false);
  const [input, setInput] = useState('');
  const onDivClick = () => {
    if (isJoin || !isPrivate) console.log('방으로');
    if (!isClick) setIsClick(true);
  };
  const onCancelButtonClick = () => setIsClick(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${id}랑 ${input} 보내고, 유효성 검사가 되면 채팅방으로 이동`);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);
  return (
    <ChannelStyles onClick={onDivClick}>
      <ChannelInfoList>
        {isPrivate && isClick && !isJoin ? (
          <>
            <ChannelInfo>비밀번호를 입력하세요.</ChannelInfo>
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
              <input
                type="password"
                style={{width: '50%'}}
                onChange={onChange}
              />
              <button>입력</button>
              <button type="button" onClick={onCancelButtonClick}>
                취소
              </button>
            </form>
          </>
        ) : (
          <>
            <ChannelInfo>
              {name}
              {isPrivate && ' 🔑'}
            </ChannelInfo>
            <ChannelInfo>{number}명</ChannelInfo>
          </>
        )}
      </ChannelInfoList>
    </ChannelStyles>
  );
}
