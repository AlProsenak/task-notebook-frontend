import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import TaskService from '../services/TaskService';


const EditTaskComponent = (props) => {
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

  const fetchTask = async (id) => {
    try {
      const response = await TaskService.getById(id);
      setTask(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(`Error: ${error.message}`);
      }     
    }
  }

  // USE EFFECTS
  useEffect(() => {
    // Not my proudest moment, but it works.
    fetchTask(props.match.params.id);
  }, [])

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
      
      TaskService.updateById(task.id, task)
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

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Task submitted successfully!</h4>
          <br/>
          <Link to="/task-add">
            <button>Add another</button>
          </Link>

          <Link to="/">
            <button>Return</button>
          </Link>
        </div>
      ) : (
      <div 
          className = "card col-md-6 offset-md-3 offset-md-3"
        >
          <br/>
          <h4>Edit Task: {props.match.params.id}</h4>
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
              onClick={handleSubmitTask}
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

export default EditTaskComponent;
