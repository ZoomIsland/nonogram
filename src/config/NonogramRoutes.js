import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GridCreator from '../containers/GridCreator';

function NonogramRoutes(props) {
  return (
    <Switch>
      <Route
        exact path='/nonograms/new'
        render={(props) => <GridCreator />} />
      
    </Switch>
  )
}

export default NonogramRoutes;