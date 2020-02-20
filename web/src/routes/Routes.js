import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../screens/Auth/Login';

import Dashboard from '../screens/Dashboard/Dashboard';
import NewEditDeliveryman from '~/screens/Deliveryman/NewEditDeliveryman/NewEditDeliveryman';

import Deliveryman from '../screens/Deliveryman/Deliveryman';
import Recipients from '../screens/Recipients/Recipients';
import Problems from '../screens/Problems/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route
        path="/deliveryman/new/:deliverymanId?"
        exact
        component={NewEditDeliveryman}
        isPrivate
      />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
