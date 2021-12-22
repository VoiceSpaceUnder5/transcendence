import React, {useState} from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {MenuInfoList, MenuInfo} from '../common/MenuList';
import {useDispatch} from 'react-redux';
import {joinChannel} from '../../modules/chatting';

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
    if (isJoin || !isPrivate) dispatch(joinChannel(id));
    if (!isClick) setIsClick(true);
  };
  const onCancelButtonClick = () => setIsClick(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('비공개방');
    onJoinChannel(id);
  };

  const [{password}, onChange] = useInput({password: ''});
  const dispatch = useDispatch();
  const onJoinChannel = (id: number) => dispatch(joinChannel(id));
  return (
    <ChannelStyles onClick={onDivClick}>
      <MenuInfoList>
        {isPrivate && isClick && !isJoin ? (
          <>
            <MenuInfo>비밀번호를 입력하세요.</MenuInfo>
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
            <MenuInfo>
              {name}
              {isPrivate && ' (비)'}
            </MenuInfo>
            <MenuInfo>{number}명</MenuInfo>
          </>
        )}
      </MenuInfoList>
    </ChannelStyles>
  );
}
