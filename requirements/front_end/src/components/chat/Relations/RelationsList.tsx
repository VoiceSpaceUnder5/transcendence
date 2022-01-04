import React from 'react';
import useInput from '../../../hooks/useInput';
import {MenuList} from '../../common/MenuList';
import RelationUserList from './RelationUserList';
import SearchUser from './SearchUser';

export default function RelationList(): JSX.Element {
  const [{name}, onChange] = useInput({name: '' as string});
  return (
    <MenuList>
      <SearchUser name={name as string} onChange={onChange} />
      {!name && (
        <>
          <RelationUserList typeId="RE2" type="친구" />
          <RelationUserList typeId="RE0" type="요청 받음" />
          <RelationUserList typeId="RE1" type="요청 보냄" />
          <RelationUserList typeId="RE3" type="차단 중" />
        </>
      )}
    </MenuList>
  );
}
