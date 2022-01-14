import React, {useState, useEffect} from 'react';
import buildGraphQLProvider from 'ra-data-graphql';
import {DataProvider} from 'ra-core';
import buildQuery from './buildQuery';
import {Admin, Resource} from 'react-admin';
import {UserEdit, UserList} from './entity/users';
import {CodeList} from './entity/code';
import {MessageList} from './entity/messages';

export default function AdminPage(): JSX.Element {
  const [dataProvider, setDataProvider] = useState<null | DataProvider>(null);

  useEffect(() => {
    buildGraphQLProvider({
      buildQuery,
      clientOptions: {
        uri: 'http://api.ts.io:30000/graphql',
      },
    }).then(dataProvider => setDataProvider(dataProvider));
  }, []);

  return dataProvider ? (
    <Admin dataProvider={dataProvider}>
      <Resource name="User" list={UserList} edit={UserEdit} />
      <Resource name="Code" list={CodeList} />
      <Resource name="Message" list={MessageList} />
    </Admin>
  ) : (
    <div>Loading</div>
  );
}
