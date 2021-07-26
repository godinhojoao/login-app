import React from 'react';

import './Card.scss';

function Card({ children }) {
  return (
    <div className="card">
      <header className="card__header"></header>
      <div className="card__content">
        {children}
      </div>
    </div>
  );
};

export { Card };