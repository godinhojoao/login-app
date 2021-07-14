import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { Context } from './../../context/AuthContext';

function Dashboard() {
  const history = useHistory();
  const { handleLogout } = useContext(Context);

  function handleSubmit(event) {
    event.preventDefault();

    handleLogout();
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrou autenticado, boa!!</h1>
      <button>Sair</button>
    </form>
  );
};

export default Dashboard;