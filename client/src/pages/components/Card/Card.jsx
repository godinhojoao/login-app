import React, { useState, Fragment } from 'react';

import { IconsManager } from './../../../assets/icons/IconsManager';
import { Button } from './../Button/Button';

import './Card.scss';

function Card({ user, editProfile = false }) {
  const iconsManager = new IconsManager();
  const userEntries = Object.entries(user);
  const [isEditable, setIsEditable] = useState({
    id: false,
    name: false,
    email: false,
    password: false
  });

  function onChangeEditable(event) {
    const path = event.nativeEvent.path;

    path.forEach(element => {

      if (element && element.classList && element.classList.contains('card__item')) {

        userEntries.forEach(entry => {

          if (element.classList.contains(entry[0])) {
            const currentKeyToChange = entry[0];
            const currentValue = isEditable[currentKeyToChange];
            setIsEditable({ ...isEditable, [currentKeyToChange]: !currentValue });
          }
        });

      }
    });
  }

  function onSave(event) {
    console.log(event);
  }

  return (
    <>
      <div className="card">
        {
          userEntries.map((entry, index) => {
            const [key, value] = entry;

            return (
              <Fragment key={index} >
                {
                  key !== 'id' &&
                  <div className={`card__item ${key}`}>
                    <span className={!isEditable[key] ? 'blocked' : 'actived'} >
                      {
                        !isEditable[key] ?
                          <iconsManager.BlockIcon />
                          :
                          <iconsManager.EditIcon measures={{ height: '24px', width: '24px' }} />
                      }
                    </span>
                    <span className="card__item__label">{key}</span>
                    <input
                      type={`${key === 'password' ? 'password' : 'text'}`}
                      className="card__item__info"
                      name={key}
                      defaultValue={value}
                      autoComplete="off"
                      disabled={!isEditable[key]} />
                    {
                      editProfile &&
                      <div className="edit-container" onClick={onChangeEditable}>
                        <span>Editar</span>
                        <iconsManager.EditIcon />
                      </div>
                    }
                  </div>
                }
              </Fragment>
            );
          })
        }
      </div >
      {editProfile &&
        <Button
          buttonText="Salvar"
          style={{ 'width': 'calc(100% - 24px)', 'alignSelf': 'center' }}
          callbackFunction={onSave} />
      }
    </>
  );
}

export { Card };