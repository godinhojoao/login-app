import React from 'react';

import './Card.scss';
import { EditIcon } from './../../../assets/EditIcon';

function Card({ user, editProfile = false }) {
  delete user.id;
  const userEntries = Object.entries(user);

  return (
    <div key={user.id} className="card">
      {
        userEntries.map((entry, index) => {
          return (
            <div key={index} className="card__item">
              <span className="label">{entry[0]}</span> {entry[1]}
              {editProfile &&
                <div className="edit-container">
                  <span>Editar</span>
                  <EditIcon className="link-style" />
                </div>
              }
            </div>
          );
        })
      }
    </div>
  );
};

export { Card };