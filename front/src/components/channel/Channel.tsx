import React, {useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import ChannelInfoList from './ChannelInfoList';
import ChannelInfo from './ChannelInfo';
import {useDispatch} from 'react-redux';
import {selectChatMenu} from '../../modules/chatting';

const FormStyles = styled.form`
  display: flex;
  margin: 2px 0px;
  padding: 2px 8px;
`;

const FormInputStyles = styled.input`
  width: 52%;
`;

const FormButtonStyles = styled.button`
  padding: 0px 4px;
`;

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
    background-color: ${props => props.theme.greyButtonBg};
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
  const onDivClick = () => {
    if (isJoin || !isPrivate) onChatMenuClick(4);
    if (!isClick) setIsClick(true);
  };
  const onCancelButtonClick = () => setIsClick(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      `${id}랑 ${password} 보내고, 유효성 검사가 되면 채팅방으로 이동`,
    );
    onChatMenuClick(4);
  };

  const [{password}, onChange] = useInput({password: ''});
  const dispatch = useDispatch();
  const onChatMenuClick = (idx: number) => dispatch(selectChatMenu(idx));
  return (
    <ChannelStyles onClick={onDivClick}>
      <ChannelInfoList>
        {isPrivate && isClick && !isJoin ? (
          <>
            <ChannelInfo>비밀번호를 입력하세요.</ChannelInfo>
            <FormStyles onSubmit={onSubmit}>
              <FormInputStyles
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <FormButtonStyles type="submit">입력</FormButtonStyles>
              <FormButtonStyles type="button" onClick={onCancelButtonClick}>
                취소
              </FormButtonStyles>
            </FormStyles>
          </>
        ) : (
          <>
            <ChannelInfo>
              {name}
              {isPrivate && ' (비)'}
            </ChannelInfo>
            <ChannelInfo>{number}명</ChannelInfo>
          </>
        )}
      </ChannelInfoList>
    </ChannelStyles>
  );
}
