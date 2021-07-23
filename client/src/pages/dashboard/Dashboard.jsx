import React, { useContext } from 'react';
import { useAlert } from 'react-alert';

import { Context } from '../../context/AuthContext';
import { Button } from '../components/Button/Button';

import './Dashboard.scss';

function Dashboard() {
  const alert = useAlert();
  const { handleLogout } = useContext(Context);

  function handleSubmit(event) {
    event.preventDefault();

    handleLogout();
    alert.success('Você foi desconectado com sucesso!')
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrou autenticado, boa!!</h1>
      <Button buttonText="Sair"/>
    </form>
  );
};

export { Dashboard };