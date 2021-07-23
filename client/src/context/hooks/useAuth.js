import { useState, useEffect } from "react";

import { localStorageManager } from './../../shared/LocalStorageManager';
import { Api } from './../../Api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    (async () => {
      if (token && user) {
        token = JSON.parse(token);
        user = JSON.parse(user);
        const { error } = await Api.getSpecificUser({ id: user.id, token });

        if (error) {
          localStorageManager.removeItems(['token', 'user'])
        } else {
          setIsAuthenticated(true);
        }
      }
    })()

    setIsLoading(false);
  }, []);

  async function handleLogin({ email, password, alert }) {
    setIsLoading(true);

    const data = await Api.login({ email, password });
    const { error, user, token } = data;

    if (error) {
      setIsLoading(false);
      return alert.error(error.message);
    }

    if (token && user) {
      const { error } = await Api.getSpecificUser({ id: user[0].id, token });

      if (error) return;
      else {
        setIsAuthenticated(true);

        const items = [
          {
            name: 'token',
            value: token
          },
          {
            name: 'user',
            value: user[0]
          }
        ]

        localStorageManager.addItems(items);
      }
      setIsLoading(false);
      alert.success('Login realizado com sucesso!');
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorageManager.removeItems(['token', 'user'])
  }

  return { isAuthenticated, isLoading, handleLogin, handleLogout };
};