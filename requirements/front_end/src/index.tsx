import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import {createStore} from 'redux';
import rootReducer from './modules';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphQLErrors}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message}) => {
      if (message === 'Unauthorized') {
        window.location.href = 'http://localhost:30000/auth/refresh';
      }
    });
  }
});

const httpLink = createHttpLink({
  // 요로케 쓰면 되나?
  uri: 'http://localhost:30000/graphql',
  credentials: 'include',
  // fetchOptions: {
  //   mode: 'no-cors',
  // },
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  // cache: cache,
  cache: new InMemoryCache(),
});

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
