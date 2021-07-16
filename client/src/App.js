import React from 'react';

import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

import './styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;