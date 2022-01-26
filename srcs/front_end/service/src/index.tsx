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
import axios from 'axios';

const errorLink = onError(({graphQLErrors}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message}) => {
      if (message === 'Unauthorized') {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/auth/refresh`,
            {withCredentials: true},
          )
          .then(res => {
            if (res.data === false)
              window.location.href = `${process.env.REACT_APP_FRONTEND_PROTOCOL}://${process.env.REACT_APP_FRONTEND_DOMAIN}`;
          });
      }
      if (message === 'Forbidden') {
        window.location.href = `${process.env.REACT_APP_FRONTEND_PROTOCOL}://${process.env.REACT_APP_FRONTEND_DOMAIN}`;
        alert('차단된 아이디입니다. 다시는 얼씬거리지 마세요.');
      }
    });
  }
});

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/graphql`,
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
