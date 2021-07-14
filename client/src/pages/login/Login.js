import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Context } from './../../context/AuthContext';

import './Login.css';

function Login() {
  const history = useHistory();
  const { isAuthenticated, handleLogin } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isAuthenticated]);

  function handleChangeEmail(event) {
    const currentEmail = event.target.value;

    if (currentEmail) {
      setEmail(currentEmail);
    };
  };

  function handleChangePassword(event) {
    const currentPassword = event.target.value;

    if (currentPassword) {
      setPassword(currentPassword);
    };
  };

  async function handleSubmit(event) {
    event.preventDefault();

    await handleLogin({ email, password });
    history.push('/dashboard');
  };

  return (
    <>
      <form className="login-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite seu email" required onChange={handleChangeEmail} />
        <input type="text" placeholder="Digite sua senha" required onChange={handleChangePassword} />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;