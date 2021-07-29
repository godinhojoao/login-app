import React from 'react';

import { Card } from '../Card/Card';

import './List.scss';

function List({ listTitle, listDescription, contents, editProfile = false }) {

  return (
    <div className="list">
      <header className="list__header">
        <h3 className="list__header__subtitle">{listTitle}</h3>
        <h3 className="list__header__description">{listDescription}</h3>
      </header>
      <div className="list__content">
        {
          contents.map(content => {
            return (
              <Card
                key={content.id}
                user={content}
                editProfile={editProfile} />
            );
          })
        }
      </div>
    </div>
  );
};

export { List };