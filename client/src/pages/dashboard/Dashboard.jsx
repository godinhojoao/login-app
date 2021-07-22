import React, { useContext } from 'react';

import { Context } from '../../context/AuthContext';
import { Button } from '../components/Button/Button';

import './Dashboard.scss';

function Dashboard() {
  const { handleLogout } = useContext(Context);

  function handleSubmit(event) {
    event.preventDefault();

    handleLogout();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrou autenticado, boa!!</h1>
      <Button buttonText="Sair"/>
    </form>
  );
};

export { Dashboard };