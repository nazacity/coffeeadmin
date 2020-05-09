import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import withApollo from 'next-with-apollo';

import cookie from 'cookie';

const uri = process.env.APOLLO_URL;

const httpLink = createHttpLink({ uri, fetch });

const authLink = setContext((_, { headers }) => {
  // Get token from cookie
  let cookies;
  // Server side
  if (headers) {
    cookies = cookie.parse(headers.cookie || '');
  }

  if (typeof window !== undefined) {
    cookies = cookie.parse(document.cookie || '');
  }

  const accessToken = (cookies && cookies.accessToken) || '';

  return {
    headers: {
      ...headers,
      authorization: accessToken ? accessToken : '',
    },
  };
});

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
});
