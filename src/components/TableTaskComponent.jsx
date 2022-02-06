import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import TaskService from '../services/TaskService';


const TableTaskComponent = () => {
  // STATES
  const [tasks, setTasks] = useState([]);

  // Fetches tasks once on page refresh from the given API path.
  useEffect(() => {
    getAllTasks();
  }, [])

  // FUNCTIONS
  const getAllTasks = async () => {
    try {
      const response = await TaskService.getAll();
      setTasks(response.data);
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

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteById(id);
      getAllTasks();
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

  return (
    <div>
      {tasks.length ? (
        <table className="table table-bordered table-striped">
          
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Accountable</th>
              <th>Completion Date</th>
              <th>Deadline</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody >
            {tasks.map((task) => (
              <tr key={task.id}> 
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.accountable}</td>
                
                {(task.completionDate) ? (
                <td>{task.completionDate}</td>
                ) : (
                <td>Uncompleted</td>
                )}
                
                {(task.deadline) ? (
                  <td>{task.deadline}</td>
                ) : (
                  <td>Not given</td>
                )}
                
                <td>{task.description}</td>
                <td>
                  <button>Completed</button>
                  <button>Edit</button>
                  
                  <button onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <div>
          <h4>Empty task list</h4>
          <br/>
        </div>
      )}

      <Link to="/task-add">
        <button>Add task</button>
      </Link>
    </div>
  );
}

export default TableTaskComponent;
