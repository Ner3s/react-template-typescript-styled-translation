import React from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import { Home } from '../pages';
import CustomRoute from './custom.route';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <CustomRoute path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
