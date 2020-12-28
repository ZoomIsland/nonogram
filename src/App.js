import Nav from './components/Nav/Nav'
import GridCreator from './containers/GridCreator'

import NonogramRoutes from './config/NonogramRoutes';

import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <NonogramRoutes />
      {/* <GridCreator /> */}
      {/* Footer */}
    </div>
  );
}

export default App;
