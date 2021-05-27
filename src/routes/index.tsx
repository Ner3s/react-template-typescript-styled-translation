import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home, Profile } from '~/pages';
import CustomRoute from './custom.routes';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <CustomRoute path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
