import React, { ReactElement } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '~/hooks/Auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  typeRole?: string;
  component: React.ComponentType;
}

function Custom({
  isPrivate = false,
  component: Component,
  typeRole,
  ...rest
}: RouteProps): ReactElement {
  const { user } = useAuth();
  const role = user ? user.role : null;
  return (
    <ReactDOMRoute
      {...rest}
      render={() =>
        role === typeRole ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/' }} />
        )
      }
    />
  );
}

export default Custom;
