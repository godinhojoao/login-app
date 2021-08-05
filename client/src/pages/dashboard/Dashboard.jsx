import React, { useEffect, useState } from 'react';
import { useAlert } from "react-alert";

import { localStorageManager } from './../../shared/LocalStorageManager'
import { Api } from './../../Api';

import { List } from '../components/List/List';

import './Dashboard.scss';

function Dashboard() {
  const alert = useAlert();
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorageManager.getItem('token');

    Api.getUsers(token)
      .then(res => {
        if (res.error) {
          localStorageManager.removeItems(['token', 'user'])
          alert.error('Algum erro ocorreu, faça login novamente.');
        }

        setUsers(res);
      });
  }, [alert]);

  return (
    <div className="content-container">
      <List
        listTitle="Lista de usuários"
        listDescription="Listagem de todos usuários cadastrados"
        contents={users} />
    </div>
  );
}

export { Dashboard };