import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../screens/Auth/Login';

import Dashboard from '../screens/Dashboard/Dashboard';

import Deliveryman from '../screens/Deliveryman/Deliveryman';
import NewEditDeliveryman from '~/screens/Deliveryman/NewEditDeliveryman/NewEditDeliveryman';

import Recipients from '../screens/Recipients/Recipients';
import NewEditRecipients from '../screens/Recipients/NewEditRecipients/NewEditRecipients';

import Problems from '../screens/Problems/Problems';
import NewEditOrder from '~/screens/Dashboard/NewEditOrder/NewEditOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route
        path="/dashboard/new/:orderId?/:recipientId?/:deliverymanId?"
        component={NewEditOrder}
        isPrivate
      />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route
        path="/deliveryman/new/:deliverymanId?"
        component={NewEditDeliveryman}
        isPrivate
      />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />

      <Route
        path="/recipients/new/:recipientId?"
        component={NewEditRecipients}
        isPrivate
      />
      <Route path="/recipients" component={Recipients} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
