import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ApolloProvider } from './services/ApolloProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </StrictMode>,
);