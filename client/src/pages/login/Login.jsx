import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { Context } from './../../context/AuthContext';
import schema from './loginSchema';

import Form from './../components/Form/Form';

import './Login.scss';

function Login() {
  const history = useHistory();
  const alert = useAlert();
  const { isAuthenticated, handleLogin } = useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/profile');
    }
  }, [history, isAuthenticated]);

  async function onSubmit(values) {
    try {
      await handleLogin({ ...values, alert });
    } catch (error) {
      alert.error("Servidor desligado!");
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
    <>
      <div className="container">
        <Form
          schema={schema}
          onSubmit={onSubmit}
          valuesObj={valuesObj}
          buttonText="Entrar"
          loginForm={true} />
      </div>
    </>
  );
};

export { Login };