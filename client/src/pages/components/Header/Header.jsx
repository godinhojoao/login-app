import React from 'react';

import { Dropdown } from './../Dropdown/Dropdown';

function Header() {
  return (
    <header className="dashboard-menu-header">
      <h1>LOGO</h1>
      <Dropdown>
        <img src="https://img.icons8.com/material-outlined/24/000000/user--v1.png" alt="Icone perfil" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,11.109L21,11.109c0-1.329-1.481-2.122-2.587-1.385L12,14L5.587,9.725C4.481,8.988,3,9.78,3,11.109v0 c0,0.556,0.278,1.076,0.741,1.385l7.15,4.766c0.672,0.448,1.547,0.448,2.219,0l7.15-4.766C20.722,12.185,21,11.666,21,11.109z"></path></svg>
      </Dropdown>
    </header>
  );
};

export { Header };