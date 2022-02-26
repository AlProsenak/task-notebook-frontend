import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import TaskService from '../services/TaskService';


const TableTaskComponent = () => {
  // STATES
  const [tasks, setTasks] = useState([]);
  const [completeFlag, setCompleteFlag] = useState("all");

  // USE EFFECTS
  useEffect(() => {
    fetchTaskList("all");
  }, [])

  // FUNCTIONS
  const getResponseDataByCompletion = (showCompleted) => {
    setCompleteFlag(showCompleted);

    if (showCompleted === "all") {
      const response = TaskService.getAll();
      return response;
    } else if (showCompleted === "completed") {
      const response = TaskService.getAllCompleted(true);
      return response;
    } else if (showCompleted === "uncompleted") {
      const response = TaskService.getAllCompleted(false);
      return response;
    } else {
      throw new Error("Error at getResponseDataByCompletion")
    }
  }

  const checkForResponseData = (response) => {
    if (response.data) {
      setTasks(response.data.sort(
        (a, b) => (a.id - b.id)
      ));
    } else {
      setTasks([]);
    }
  }

  // EVENT HANDLERS
  const fetchTaskList = async (showCompleted) => {
    try {
      const response = await getResponseDataByCompletion(showCompleted);
      checkForResponseData(response);
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
      switch (completeFlag) {
        case "all":
        fetchTaskList(completeFlag);
        break;
        case "completed":
        fetchTaskList(completeFlag);
        break;
        case "uncompleted":
        fetchTaskList(completeFlag);
        break;
      }
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

  const handleDeleteTasks = async (id = null, completed = null) => {
    try {
      if (id) {
        await TaskService.deleteById(id);
      } else
      if (completed) {
        await TaskService.deleteAllCompleted(completed);
      } else 
      if (!id && !completed) {
        await TaskService.deleteAll();
      } else {
        throw new Error("Error at handleDeleteTasks");
      }
      fetchTaskList("all");
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

                  <Link to={`/task-edit/${task.id}`}>
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => handleDeleteTasks(task.id)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <div>
          <h4>Empty task list</h4>
          <br />
        </div>
      )}

      <Link to="/task-add">
        <button>Add task</button>
      </Link><br /><br />
      <div>
        <button onClick={() => fetchTaskList("completed")}>Show completed</button>
        <button onClick={() => fetchTaskList("uncompleted")}>Show uncompleted</button>
        <button onClick={() => fetchTaskList("all")}>Show all</button>
      </div><br />
      <div>
        <button onClick={() => handleDeleteTasks(...[,], true)}>Delete completed</button>
        <button onClick={() => handleDeleteTasks(...[,], false)}>Delete uncompleted</button>
        <button onClick={() => handleDeleteTasks()}>Delete all</button>
      </div>
    </div>
  );
}

export default TableTaskComponent;
