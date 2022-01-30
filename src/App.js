import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';

// COMPONENTS
import AboutComponent from './components/AboutComponent';
import CreateTaskComponent from './components/CreateTaskComponent';
import ErrorComponent from './components/ErrorComponent';
import HeaderComponent from './components/HeaderComponent';
import TableTaskComponent from './components/TableTaskComponent';


function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        
        <Switch>
          <Route exact path="/" children={<TableTaskComponent />} />
          <Route path="/about" component={AboutComponent} />
          <Route path="/create-task" component={CreateTaskComponent} />
          
          {/* Displays following component if no other paths match */}
          <Route path="*" component={ErrorComponent} />
        </Switch>   
      </Router>
    </div>
  );
}

export default App;
