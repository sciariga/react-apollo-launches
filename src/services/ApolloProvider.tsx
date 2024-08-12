import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import React from 'react';

const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launches: {
            merge: true,
          },
        },
      },
    },
  });

const client = new ApolloClient({
    uri: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
    cache: cache
});

export const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider client={client}>{children}</Provider>;
};