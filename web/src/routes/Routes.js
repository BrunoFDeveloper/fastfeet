import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../screens/Auth/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import Deliveryman from '../screens/Deliveryman/Deliveryman';
// import Dashboard from '../screens/Dashboard/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
    </Switch>
  );
}
