import React from 'react';
import styled from 'styled-components';
import {MenuInfoList, MenuInfo} from '../common/MenuList';

const FriendStyle = styled.div`
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
`;

const ProfileImageStyle = styled.img<{isOnline?: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid
    ${props => (props.isOnline ? `grey;` : `${props.theme.online};`)};
`;

interface FriendProps {
  imagePath?: string;
  userId: string;
  isOnline: boolean;
  matchRecord?: string;
  description?: string;
}

export default function Friend({
  userId,
  imagePath,
  isOnline,
  matchRecord,
  description,
}: FriendProps): JSX.Element {
  return (
    <FriendStyle>
      <ProfileImageStyle src={imagePath} isOnline={isOnline} />
      <MenuInfoList>
        {userId && <MenuInfo>{userId}</MenuInfo>}
        {description && <MenuInfo>{description}</MenuInfo>}
        {matchRecord && <MenuInfo>{matchRecord}</MenuInfo>}
      </MenuInfoList>
    </FriendStyle>
  );
}

// 클릭 시 게임, 채팅, 친구신청하는 데에 아마도 쓸듯
// const FormStyles = styled.form`
//   display: flex;
//   margin: 2px 0px;
//   padding: 2px 8px;
// `;

// const FormInputStyles = styled.input`
//   width: 52%;
// `;

// const FormButtonStyles = styled.button`
//   padding: 0px 4px;
// `;

// const [isClick, setIsClick] = useState(false);
// const onCancelButtonClick = () => setIsClick(false);

// const onSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   console.log('비공개방');
//   onJoinChannel(id);
// };

// const [{password}, onChange] = useInput({password: ''});
//  {isPrivate && isClick && !isJoin ? (
// <>
//   <MenuInfo>비밀번호를 입력하세요.</MenuInfo>
//   <FormStyles onSubmit={onSubmit}>
//     <FormInputStyles
//       type="password"
//       name="password"
//       value={password}
//       onChange={onChange}
//     />
//     <FormButtonStyles type="submit">입력</FormButtonStyles>
//     <FormButtonStyles type="button" onClick={onCancelButtonClick}>
//       취소
//     </FormButtonStyles>
//   </FormStyles>
// </>
// ) : (
