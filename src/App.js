import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// STYLING 
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// COMPONENTS
import AboutComponent from './components/AboutComponent';
import AddTaskComponent from './components/AddTaskComponent';
import EditTaskComponent from './components/EditTaskComponent';
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
          <Route path="/task-add" component={AddTaskComponent} />
          <Route path="/task-edit/:id" component={EditTaskComponent} />
          
          {/* Displays following component if no other paths match */}
          <Route path="*" component={ErrorComponent} />
        </Switch>   
      </Router>
    </div>
  );
}

export default App;
