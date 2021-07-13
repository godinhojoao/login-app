import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './auth';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (isAuthenticated() ?
          <Component {...props} />
          :
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }} />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Login />} />
        <PrivateRoute exact path="/dashboard" component={() => <Dashboard />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;