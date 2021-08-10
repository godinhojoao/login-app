import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { Context } from './../../context/AuthContext';
import { Api } from './../../Api';
import Form from './../components/Form/Form';
import schema from './registerSchema';

function Register() {
  const alert = useAlert();
  const history = useHistory();
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    document.querySelector('.container').classList.remove('auto-height');

    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isAuthenticated]);

  async function onSubmit(values) {
    try {
      const { error } = await Api.createUser(values);

      if (error) {
        return alert.error(error.message)
      } else {
        await alert.success('Conta criada com sucesso, realize login!');
      }
      history.push('/login');
    } catch (error) {
      alert.error("Servidor desligado!");
      console.log(error);
    }
  }

  const valuesObj = {
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    labels: {
      name: 'Nome',
      email: 'Email',
      password: 'Senha'
    },
    inputTypes: {
      password: "password"
    }
  }

  return (
    <Form
      schema={schema}
      onSubmit={onSubmit}
      valuesObj={valuesObj}
      buttonText="Registrar" />
  );
}

export { Register };