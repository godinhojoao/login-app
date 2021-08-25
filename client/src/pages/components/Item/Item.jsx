import React from 'react';

import { IconsManager } from '../../../assets/icons/IconsManager';

import './Item.scss';

function Item(props) {
  const {
    entry, editProfile, isEditable, userUpdatedValues,
    setUserUpdatedValues, onChangeEditable
  } = props
  const [key, value] = entry;
  const iconsManager = new IconsManager();

  return (
    <div className={`card__item ${key}`}>
      <span className={!isEditable ? 'blocked-icon' : 'actived-icon'} >
        {
          editProfile ?
            (
              !isEditable ?
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
        type={`${key === 'password' || key === 'newPassword' || key ===  'confirmNewPassword' ? 'password' : 'text'}`}
        className="card__item__info"
        name={key}
        defaultValue={value}
        autoComplete="off"
        disabled={!isEditable}
        onChange={e => { setUserUpdatedValues({ ...userUpdatedValues, [key]: e.target.value }) }} />

      {
        editProfile &&
        <div className="edit-container" onClick={onChangeEditable}>
          <span className={!isEditable ? 'blocked-text' : 'activated-text'}>
            Editar
          </span>
          <span className={!isEditable ? 'blocked-icon' : 'actived-icon'}>
            <iconsManager.EditIcon />
          </span>
        </div>
      }
    </div>
  );
}

export { Item }