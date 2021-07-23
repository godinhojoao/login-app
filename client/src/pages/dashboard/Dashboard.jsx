import React, { useContext, useState } from 'react';
import { useAlert } from 'react-alert';

import { Context } from '../../context/AuthContext';
import { Button } from '../components/Button/Button';

import './Dashboard.scss';

function Dashboard() {
  const alert = useAlert();
  const { handleLogout } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  function handleSubmit(event) {
    event.preventDefault();

    handleLogout();
    alert.success('Você foi desconectado com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="list-users-container">
        <div className="list-users-container__user">
          <p>name: {currentUser.name}</p>
          <p>email: {currentUser.email}</p>
        </div>
      </div>

      <h3>Entrou autenticado, boa!!</h3>
      <Button buttonText="Sair" style={{ width: '100%' }} />
    </form>
  );
};

export { Dashboard };