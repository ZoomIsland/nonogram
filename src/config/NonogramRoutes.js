import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GridCreatorContainer from '../containers/GridCreatorContainer';
import NonogramIndex from '../containers/NonogramIndex';
import NonogramShow from '../containers/NonogramShow';

function NonogramRoutes(props) {
  return (
    <Switch>
      <Route
        exact path='/nonograms/new'
        component={GridCreatorContainer} />
      <Route
        exact path="/nonograms/"
        component={NonogramIndex} />
      {/* <Route
        exact path="/nonograms/random"
        component={NonogramShow} /> */}
      <Route
        path="/nonograms/:id"
        component={NonogramShow} />
    </Switch>
  )
}

export default NonogramRoutes;