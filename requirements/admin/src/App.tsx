import React, {useState, useEffect} from 'react';
import buildGraphQLProvider from 'ra-data-graphql';
import {DataProvider} from 'ra-core';
import buildQuery from './buildQuery';
import {Admin, Resource} from 'react-admin';
import {UserEdit, UserList} from './entity/users';
import {CodeList} from './entity/code';
import {MessageList} from './entity/messages';
import authProvider from './login/authProvider';
import MyLoginPage from './login/MyLoginPage';

export default function App(): JSX.Element {
  const [dataProvider, setDataProvider] = useState<null | DataProvider>(null);
  useEffect(() => {
    buildGraphQLProvider({
      buildQuery,
      clientOptions: {
        uri: 'http://localhost:30000/graphql',
      },
    }).then(dataProvider => setDataProvider(dataProvider));
  }, []);

  if (dataProvider) {
    return (
      <Admin
        loginPage={MyLoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource name="User" list={UserList} edit={UserEdit} />
        <Resource name="Code" list={CodeList} />
        <Resource name="Message" list={MessageList} />
      </Admin>
    );
  } else return <div>Loading</div>;
}
