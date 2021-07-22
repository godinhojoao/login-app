import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Context } from './../../context/AuthContext';
import schema from './loginSchema';
import Form from './../components/Form/Form';

import './Login.scss';

function Login() {
  const history = useHistory();
  const { isAuthenticated, handleLogin } = useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isAuthenticated]);

  async function onSubmit(values) {
    try {
      await handleLogin(values);
    } catch (error) {
      console.log(error);
    }
  };

  const valuesObj = {
    initialValues: {
      email: '',
      password: ''
    },
    placeholders: {
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
      buttonText="Entrar"
      loginForm={true} />
  );
};

export { Login };