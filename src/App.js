import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// STYLING 
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// COMPONENTS
import AboutComponent from './components/AboutComponent';
import ErrorComponent from './components/ErrorComponent';
import HeaderComponent from './components/HeaderComponent';
import SubmitTaskComponent from './components/SubmitTaskComponent';
import TableTaskComponent from './components/TableTaskComponent';


function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        
        <Switch>
          <Route exact path="/" children={<TableTaskComponent />} />
          <Route path="/about" component={AboutComponent} />
          <Route path="/task-add" component={SubmitTaskComponent} />
          <Route path="/task-edit/:id" component={SubmitTaskComponent} />
          
          {/* Displays following component if no other paths match */}
          <Route path="*" component={ErrorComponent} />
        </Switch>   
      </Router>
    </div>
  );
}

export default App;
