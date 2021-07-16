import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Context } from './../../context/AuthContext';

import './Login.scss';

function Login() {
  const history = useHistory();
  const { isAuthenticated, handleLogin } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isAuthenticated]);

  function handleChangeEmail(event) {
    const currentEmail = event.target.value;
    setEmail(currentEmail);

    if (currentEmail.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) return setIsValidEmail(true);
  };

  function handleChangePassword(event) {
    const currentPassword = event.target.value;
    setPassword(currentPassword);

    return setIsValidPassword(true);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    return await handleLogin({ email, password });
  };

  return (
    <>
      <form className="login-container" onSubmit={handleSubmit} noValidate>
        <div className="login-container__input-container">
          <input type="text" placeholder="Digite seu email" className={!isValidEmail ? 'error' : ''} required
            onChange={handleChangeEmail}
            onBlur={e => setIsValidEmail(e.target.value.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))} />
          {!isValidEmail &&
            <span className="login-container__input-container__error">Formato de e-mail inválido!</span>
          }
        </div>
        <div className="login-container__input-container">
          <input type="text" placeholder="Digite sua senha" className={!isValidPassword ? 'error' : ''} required
            onChange={handleChangePassword}
            onBlur={e => setIsValidPassword(e.target.value.length > 0)} />
          {!isValidPassword &&
            <span className="login-container__input-container__error">Senha é um campo obrigatório</span>
          }
        </div>
        <button disabled={!isValidEmail || !isValidPassword} className={!isValidEmail | !isValidPassword ? 'disabled' : ''}>Login</button>
      </form>
    </>
  );
};

export default Login;