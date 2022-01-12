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

  // ** 관계 타입 relation.type
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE0',
      label_korean: '1이 2의 수락 대기 중',
      label_english: 'pending_first_second',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE1',
      label_korean: '2가 1의 수락 대기 중',
      label_english: 'pending_second_first',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE2',
      label_korean: '친구',
      label_english: 'friends',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE3',
      label_korean: '1이 2 차단',
      label_english: 'blocked_first_second',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE4',
      label_korean: '2가 1 차단',
      label_english: 'blocked_second_first',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE5',
      label_korean: '서로 차단',
      label_english: 'blocked_both',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'RE',
      id: 'RE6',
      label_korean: '남',
      label_english: 'no_relation',
    },
    ['id'],
  );

  // ** 경기 결과 record.result
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BR',
      id: 'BR0',
      label_korean: '왼쪽 승',
      label_english: 'left_win',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BR',
      id: 'BR1',
      label_korean: '오른쪽 승',
      label_english: 'right_win',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BR',
      id: 'BR2',
      label_korean: '무승부',
      label_english: 'draw',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BR',
      id: 'BR3',
      label_korean: '취소됨',
      label_english: 'cancled',
    },
    ['id'],
  );

  // ** 경기 타입 record.type
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BT',
      id: 'BT0',
      label_korean: '일반',
      label_english: 'normal',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BT',
      id: 'BT1',
      label_korean: '레더',
      label_english: 'ladder',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BM',
      id: 'BM0',
      label_korean: '보통',
      label_english: 'normal',
    },
    ['id'],
  );
  entityManager.upsert<Code>(
    Code,
    {
      group: 'BM',
      id: 'BM1',
      label_korean: '어려움',
      label_english: 'hard',
    },
    ['id'],
  );
};
