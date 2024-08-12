import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
    uri: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
    cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider client={client}>{children}</Provider>;
};