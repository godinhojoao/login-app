import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Context } from './context/AuthContext';

import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoading, isAuthenticated } = useContext(Context);

  if (isLoading) return <h1>loading...</h1>;

  if (!isLoading && !isAuthenticated) return <Redirect to={{ pathname: '/' }} />;

  return <Route {...rest} render={(props) => {
    return (
      <Component {...props} />
    );
  }} />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={() => <Login />} />
        <PrivateRoute exact path="/dashboard" component={() => <Dashboard />} />
        <Route component={() => <Redirect to={{ pathname: '/login' }} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;