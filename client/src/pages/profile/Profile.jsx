import React, { useEffect } from 'react';

import { List } from './../components/List/List';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  user.password = ''
  user.newPassword = ''
  user.confirmNewPassword = ''

  useEffect(() => {
    document.querySelector('.container').classList.remove('auto-height');
  }, []);

  return (
    <div className="container">
      <List
        listTitle="Perfil"
        listDescription="Informações da sua conta"
        contents={[user]}
        editProfile={true} />
    </div>
  );
}

export { Profile };