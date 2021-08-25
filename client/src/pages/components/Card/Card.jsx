import React, { useState, Fragment } from 'react';
import { useAlert } from "react-alert";

import { Api } from './../../../Api';

import { Item } from './../Item/Item';
import { Button } from './../Button/Button';

import './Card.scss';

function Card({ user, editProfile = false }) {
  const alert = useAlert();
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    password: false
  });
  const [userUpdatedValues, setUserUpdatedValues] = useState({
    id: user.id
  });
  const userEntries = Object.entries(user);

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
            const [key] = entry;

            return (
              <Fragment key={index} >
                {
                  key !== 'id' &&
                  <>
                    <Item
                      entry={entry}
                      editProfile={editProfile}
                      isEditable={isEditable[key]}
                      userUpdatedValues={userUpdatedValues}
                      setUserUpdatedValues={setUserUpdatedValues}
                      onChangeEditable={onChangeEditable} />
                  </>
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