import { Code } from 'src/code/code.entity';
import { getConnection } from 'typeorm';

export const dbSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  // ** 유저 채팅방 역할 ChatChannelUser.role
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UR',
      id: 'UR0',
      label_korean: '소유자',
      label_english: 'Owner',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UR',
      id: 'UR0',
      label_korean: '소유자',
      label_english: 'Owner',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UR',
      id: 'UR1',
      label_korean: '관리자',
      label_english: 'Manager',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UR',
      id: 'UR2',
      label_korean: '참여자',
      label_english: 'Participant',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UR',
      id: 'UR3',
      label_korean: '차단됨',
      label_english: 'blocked',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UR',
      id: 'UR4',
      label_korean: '음소거됨',
      label_english: 'Muted',
    },
    ['id'],
  );

  // ** 채팅방 타입 ChatChannel.type
  entityManager.upsert<Code>(
    Code,
    {
      group: 'CT',
      id: 'CT0',
      label_korean: '개인',
      label_english: 'direct-message',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'CT',
      id: 'CT1',
      label_korean: '비공개',
      label_english: 'private',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'CT',
      id: 'CT2',
      label_korean: '공개',
      label_english: 'public',
    },
    ['id'],
  );

  // ** 계정 권한 user.authority
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UA',
      id: 'UA0',
      label_korean: '사이트관리자',
      label_english: 'site-manager',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'UA',
      id: 'UA1',
      label_korean: '일반회원',
      label_english: 'member',
    },
    ['id'],
  );
};
