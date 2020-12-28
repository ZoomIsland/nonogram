import Nav from './components/Nav/Nav'
import GridCreator from './containers/GridCreator'

import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <hr />
      {/* Router */}
      <GridCreator />
      {/* Footer */}
    </div>
  );
}

export default App;
