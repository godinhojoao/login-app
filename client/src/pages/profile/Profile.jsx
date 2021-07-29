import React from 'react';

import { List } from './../components/List/List';

import './Profile.scss';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  user.password = '***********';

  return (
    <div className="container">
      <List
        listTitle="Perfil"
        listDescription="Informações da sua conta"
        contents={[user]}
        editProfile={true} />
    </div>
  );
};

export { Profile };