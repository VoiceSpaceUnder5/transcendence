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
import {createHttpLink, InMemoryCache} from '@apollo/client';
import {ChannelList} from './entity/channel';
import {ChannelUserEdit, ChannelUserList} from './entity/channelUser';

const customLink = createHttpLink({
  uri: `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/graphql`,
  credentials: 'include',
});

const customCache = new InMemoryCache({
  typePolicies: {
    Agenda: {
      fields: {
        tasks: {
          merge(incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
  },
});

const customOptions = {link: customLink, cache: customCache};
export default function App(): JSX.Element {
  const [dataProvider, setDataProvider] = useState<null | DataProvider>(null);
  useEffect(() => {
    buildGraphQLProvider({
      clientOptions: customOptions,
      buildQuery,
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
        <Resource name="Channel" list={ChannelList} />
        <Resource
          name="ChannelUser"
          list={ChannelUserList}
          edit={ChannelUserEdit}
        />
      </Admin>
    );
  } else return <div>Loading</div>;
}
