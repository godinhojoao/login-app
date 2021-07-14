import React from 'react';

import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;