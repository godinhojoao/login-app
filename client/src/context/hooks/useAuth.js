import { useState, useEffect } from "react";

import { localStorageManager } from './../../shared/LocalStorageManager';
import { Api } from './../../Api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    (async () => {
      if (token && user) {
        token = JSON.parse(token);
        const { error } = await Api.getDashboard(token);

        if (error) {
          localStorageManager.removeItems(['token', 'user'])
        } else {
          setIsAuthenticated(true);
        }
      }
    })()

    setIsLoading(false);
  }, []);

  async function handleLogin({ email, password }) {
    setIsLoading(true);

    const data = await Api.login({ email, password });
    const { error, user, token } = data;

    if (error) {
      setIsLoading(false);
      return alert(error.message);
    }

    if (token && user) {
      const { error } = await Api.getDashboard(token);

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
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorageManager.removeItems(['token', 'user'])
  }

  return { isAuthenticated, isLoading, handleLogin, handleLogout };
};