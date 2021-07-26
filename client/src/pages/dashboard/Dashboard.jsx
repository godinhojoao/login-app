import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { localStorageManager } from './../../shared/LocalStorageManager'
import { Api } from './../../Api';

import { Card } from './../components/Card/Card';

import './Dashboard.scss';

function Dashboard() {
  // const history = useHistory();
  const alert = useAlert();
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    Api.getUsers(token)
      .then(res => {
        if (res.error) {
          localStorageManager.removeItems(['token', 'user'])
          alert.error('Algum erro ocorreu, faça login novamente.');
          // history.push('/login'); // nao sei pq ta dando bug
        }

        setUsers(res);
      });
  }, [alert]);

  return (
    <div className="content-container">
      {
        users && users.map(user => {
          return (
            <Card key={user.id}>
              <span>nome: {user.name}</span>
              <span>email: {user.email}</span>
            </Card>
          );
        })
      }
    </div>
  );
};

export { Dashboard };