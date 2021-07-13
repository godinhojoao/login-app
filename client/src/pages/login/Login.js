import React, { useState } from 'react';

import Api from './../../Api';
import './Login.css';

async function handleLogin({ email, password }) {
  const data = await Api.login({ email, password });

  if (data.error) {
    return { error: data.error };
  }
  return data;
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    const data = await handleLogin({ email, password });
    if (data.error) return alert(data.error.message);

    const { token } = data;
    console.log(token); // pegar esse token e enviar pra /dashboard pra logar no app
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