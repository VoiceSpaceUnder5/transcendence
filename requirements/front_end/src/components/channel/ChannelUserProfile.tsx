import React, {useState} from 'react';
import UserProfile from '../friend/UserProfile';
import Button from '../common/Button';
import useRelation from '../../hooks/useRelation';

interface ChannelUserProfileProps {
  meId: number;
  userId: number;
}

export default function ChannelUserProfile({
  meId,
  userId,
}: ChannelUserProfileProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const typeId = useRelation(meId, userId);
  const onClick = () => setVisible(!visible);
  if (!typeId) return <>로딩...</>;
  return (
    <>
      <Button bg="grey" onClick={onClick}>
        프로필 보기
      </Button>
      {visible && (
        <UserProfile
          typeId={typeId}
          meId={meId}
          userId={userId}
          onBackClick={onClick}
        />
      )}
    </>
  );
}
