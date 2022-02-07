import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import TaskService from '../services/TaskService';


const TableTaskComponent = () => {
  // STATES
  const [tasks, setTasks] = useState([]);

  // USE EFFECTS
  useEffect(() => {
    fetchTaskList();
  }, [])

  // EVENT HANDLERS
  const fetchTaskList = async () => {
    try {
      const response = await TaskService.getAll();
      setTasks(response.data.sort(
        (a, b) => (a.id - b.id)
      ));
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

  const handleToggleCompleted = async (task) => {
    try {
      (task.completed) ? (task.completed = false) : (task.completed = true);

      await TaskService.updateById(task.id, task);
      fetchTaskList();
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
      fetchTaskList();
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

  const handleDeleteCompleted = async () => {
    try {
      await TaskService.deleteAllCompleted();
      fetchTaskList();
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
    <div className="container">
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
                  <button
                    onClick={() => handleToggleCompleted(task)}
                  >{(task.completed) ? ("Undo") : ("Complete")}</button>

                  <Link 
                    to={`/task-edit/${task.id}`}
                    task={task.id}
                  >
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => deleteTask(task.id)}
                  >Delete</button>
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

      <button onClick={handleDeleteCompleted}>Delete completed</button>
    </div>
  );
}

export default TableTaskComponent;
