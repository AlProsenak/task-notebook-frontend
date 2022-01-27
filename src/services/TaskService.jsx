import axios from 'axios';


const TASK_API_URL = "http://localhost:8080/api/tasks"

class TaskService {
  // GET
  getAll() {
    return axios.get(TASK_API_URL);
  }

  getById(taskId) {
    return axios.get(TASK_API_URL + '/' + taskId);
  }

  getAllCompleted() {
    return axios.get(TASK_API_URL + '/completed');
  }

  // POST
  createNew(task) {
    return axios.post(TASK_API_URL, task);
  }

  // PUT
  updateById(taskId, task) {
    return axios.put(TASK_API_URL + '/' + taskId, task);
  }

  // DELETE
  deleteAll() {
    return axios.delete(TASK_API_URL);
  }

  deleteById(taskId) {
    return axios.delete(TASK_API_URL + '/' + taskId);
  }

  deleteAllCompleted() {
    return axios.delete(TASK_API_URL + 'completed');
  }
}

export default new TaskService();
