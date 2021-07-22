import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Context } from './../../context/AuthContext';
import { Api } from './../../Api';
import Form from './../components/Form/Form';
import schema from './registerSchema';

function Register() {
  const history = useHistory();
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isAuthenticated]);

  async function onSubmit(values) {
    try {
      const { error } = await Api.createUser(values);

      if (error) return alert(error.message);

      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const valuesObj = {
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    placeholders: {
      name: "Digite seu nome",
      email: "Digite seu e-mail",
      password: "Digite sua senha"
    },
    inputTypes: {
      password: "password"
    }
  };

  return (
    <Form
      schema={schema}
      onSubmit={onSubmit}
      valuesObj={valuesObj}
      buttonText="Registrar" />
  );
};

export { Register };