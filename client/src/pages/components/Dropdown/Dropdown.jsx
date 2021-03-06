import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';

import { Context } from './../../../context/AuthContext';

import './Dropdown.scss';

function Dropdown({ children }) {
  const history = useHistory();
  const alert = useAlert();
  const { handleLogout } = useContext(Context);
  const [showContent, setShowContent] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(history.location.pathname);

  const menuContentItems = [{
    id: 1,
    value: 'Perfil',
    func: handleShowProfile,
    url: '/profile'
  },
  {
    id: 2,
    value: 'Lista de usuários',
    func: handleShowUsersList,
    url: '/dashboard'
  },
  {
    id: 3,
    value: 'Sair',
    func: handleExit
  }]

  function handleShowProfile() {
    history.push('/profile');
    setSelectedUrl(history.location.pathname);
    setShowContent(false);
  }

  function handleShowUsersList() {
    history.push('/dashboard');
    setSelectedUrl(history.location.pathname);
    setShowContent(false);
  }

  function handleExit() {
    handleLogout();
    alert.success('Você foi desconectado com sucesso!');
  }

  return (
    <>
      {showContent &&
        <div className="dropdown-container" onClick={() => setShowContent(!showContent)}></div>
      }
      <div className={`dropdown ${showContent ? 'opened' : 'closed'}`}>
        <header className="dropdown__header" onClick={() => setShowContent(!showContent)}>
          {children}
        </header>
        <div className="dropdown__content">
          <ul>
            {
              menuContentItems.map(item => {
                return (
                  <li
                    key={item.id}
                    className={selectedUrl === item.url ? 'selected' : ''}
                    onClick={selectedUrl !== item.url ? item.func : null}>
                    {item.value}
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export { Dropdown };