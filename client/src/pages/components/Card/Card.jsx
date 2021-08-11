import React, { useState, Fragment } from 'react';
import { useAlert } from "react-alert";

import { Api } from './../../../Api';

import { IconsManager } from './../../../assets/icons/IconsManager';
import { Button } from './../Button/Button';

import './Card.scss';

function Card({ user, editProfile = false }) {
  const alert = useAlert();
  const iconsManager = new IconsManager();
  const userEntries = Object.entries(user);
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    password: false
  });
  const [userUpdatedValues, setUserUpdatedValues] = useState({
    id: user.id
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

  async function onUpdateUser() {

    if (Object.keys(userUpdatedValues).length <= 1) {
      return alert.error('É necessário editar algum valor antes de salvar.');
    }

    const token = JSON.parse(localStorage.getItem('token'));

    try {
      const data = await Api.updateUser({ id: userUpdatedValues.id, token, user: userUpdatedValues });
      const { error, updatedUser } = data;

      if (error) { return alert.error(error.message); }

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserUpdatedValues({ id: updatedUser.id });
      setIsEditable({
        name: false,
        email: false,
        password: false
      });

      return alert.success('Usuário editado com sucesso!');
    } catch (error) {
      alert.error(error.message);
      console.log(error);
    }
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
                    <span className={!isEditable[key] ? 'blocked-icon' : 'actived-icon'} >
                      {
                        editProfile ?
                          (
                            !isEditable[key] ?
                              <iconsManager.BlockIcon />
                              :
                              <iconsManager.EditIcon measures={{ height: '24px', width: '24px' }} />
                          )
                          :
                          <img src="https://img.icons8.com/material-outlined/24/000000/user--v1.png" alt="Icone perfil" />
                      }
                    </span>

                    <span className="card__item__label">{key}</span>
                    <input
                      type={`${key === 'password' ? 'password' : 'text'}`}
                      className="card__item__info"
                      name={key}
                      defaultValue={value}
                      autoComplete="off"
                      disabled={!isEditable[key]}
                      onChange={e => { setUserUpdatedValues({ ...userUpdatedValues, [key]: e.target.value }) }} />

                    {
                      editProfile &&
                      <div className="edit-container" onClick={onChangeEditable}>
                        <span className={!isEditable[key] ? 'blocked-text' : 'activated-text'}>
                          Editar
                        </span>
                        <span className={!isEditable[key] ? 'blocked-icon' : 'actived-icon'}>
                          <iconsManager.EditIcon />
                        </span>
                      </div>
                    }
                  </div>
                }
              </Fragment>
            );
          })
        }
      </div >
      {
        editProfile &&
        <Button
          buttonText="Salvar"
          style={{ 'width': 'calc(100% - 24px)', 'alignSelf': 'center' }}
          callbackFunction={onUpdateUser} />
      }
    </>
  );
}

export { Card };