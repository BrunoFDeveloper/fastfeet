import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { store } from '~/store';

import AuthLayout from '../screens/_layout/AuthLayout/AuthLayout';
import DefaultLayout from '../screens/_layout/DefaultLayout/DefaultLayout';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...props
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) return <Redirect to="/" />;
  if (signed && !isPrivate) return <Redirect to="/dashboard" />;

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...props}
      render={routeProps => (
        <Layout>
          <Component {...routeProps} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.defaultProps = {
  isPrivate: false,
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
