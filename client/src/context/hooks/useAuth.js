import { useState, useEffect } from "react";

import { Api } from './../../Api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');

    (async () => {
      if (token) {
        token = JSON.parse(token);
        const { error } = await Api.getDashboard(token);

        if (error) {
          localStorage.removeItem('token');
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
    const { error, token } = data;

    if (error) {
      setIsLoading(false);
      return alert(error.message);
    }

    if (token) {
      const { error } = await Api.getDashboard(token);

      if (error) return;
      else {
        setIsAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(token));
      }
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  }

  return { isAuthenticated, isLoading, handleLogin, handleLogout };
};