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
        window.location.href = `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_API}${process.env.REACT_APP_BACKEND_DOMAIN}/auth/refresh`;
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
