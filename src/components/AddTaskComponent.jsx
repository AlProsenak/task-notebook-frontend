import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import TaskService from '../services/TaskService';


const AddTaskComponent = () => {
  // INITIAL VALUES
  const initialDate = new Date().toISOString().split('T')[0];
  const initialTaskValue = {
  title: '',
  accountable: '',
  deadline: initialDate,
  description: ''
  }

  // STATES
  const [task, setTask] = useState(initialTaskValue);
  const [submitted, setSubmitted] = useState(false);
  const [validFields, setValidFields] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    if ( 
      task.title.trim() === initialTaskValue.title || 
      task.description.trim() === initialTaskValue.description 
    ) {
      setValidFields(false);
    } else {
      setValidFields(true);
    }
  }, [task]);

  useEffect(() => {
    console.log(`Valid fields: ${validFields}`);
  }, [validFields]);

  // EVENT HANDLERS
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTask({...task, [name]: value});
  }

  const handleSubmitTask = (e) => {
    if (validFields) {
      e.preventDefault();
      
      TaskService.createNew(task)
        .then((response) => {
          const { title, accountable, deadline, description} = response.data;
          setTask({
            title: title,
            accountable: accountable,
            deadline: deadline,
            description: description
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Title and description are required fields!");
    }
  }

  const handleNewTask = () => {
    setTask(initialTaskValue);
    setSubmitted(false);
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Task submitted successfully!</h4>
          <br/>
          <button onClick={handleNewTask}>Add another</button>
          <Link to="/">
            <button>Return</button>
          </Link>
        </div>
      ) : (
        <div 
          className = "card col-md-6 offset-md-3 offset-md-3"
        >
          <br/>
          <h4>New Task</h4>
          <form>
            <div className="form-group">
              <label>Title</label>
              <br/>
              <input
                onChange={handleInput}
                type="text"
                name="title"
                value={task.title}
                size="40"
                required
              />
            </div>

            <div className="form-group">
              <label>Accountable</label>
              <br/>
              <input
                onChange={handleInput}
                type="text"
                name="accountable"
                value={task.accountable}
                size="40"
              />
            </div>

            <div className="form-group">
              <label>Deadline</label>
              <br/>
              <input
                onChange={handleInput}
                type="date"
                name="deadline"
                value={task.deadline}
                min={initialDate}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <br/>
              <textarea
                onChange={handleInput}
                name="description"
                value={task.description}
                rows="5"
                cols="42"
                required
              />
            </div>

            <button 
              onClick={(e) => handleSubmitTask(e)}
              type="submit"
            >Submit</button>

            <Link to="/">
              <button>Cancel</button>
            </Link>
          </form>
          <br/>
        </div>
      )}
    </div>
  );
}

export default AddTaskComponent;
