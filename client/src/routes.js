import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Context } from './context/AuthContext';

import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Profile } from './pages/profile/Profile';

import { Header } from './pages/components/Header/Header';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoading, isAuthenticated } = useContext(Context);

  if (isLoading) return <h1>loading...</h1>;

  if (!isLoading && !isAuthenticated) return <Redirect to={{ pathname: '/' }} />;

  return <Route {...rest} render={(props) => {
    return (
      <>
        <Header />
        <Component {...props} />
      </>
    );
  }} />;
};

const Routes = () => {
  const alertOptions = {
    timeout: 3000,
    position: positions.TOP_LEFT
  }

  return (
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Switch>
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/register" component={() => <Register />} />
          <PrivateRoute exact path="/dashboard" component={() => <Dashboard />} />
          <PrivateRoute exact path="/profile" component={() => <Profile />} />
          <Route component={() => <Redirect to={{ pathname: '/login' }} />} />
        </Switch>
      </AlertProvider>
    </BrowserRouter >
  );
};

export default Routes;