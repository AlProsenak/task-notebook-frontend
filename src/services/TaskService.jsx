import axios from 'axios';


const TASK_API_URL = "http://localhost:8080/api/tasks"

class TaskService {
  // GET
  getAll() {
    return axios.get(TASK_API_URL);
  }

  getById(id) {
    return axios.get(TASK_API_URL + '/' + id);
  }

  getAllCompleted() {
    return axios.get(TASK_API_URL + '/completed');
  }

  // POST
  createNew(task) {
    return axios.post(TASK_API_URL, task);
  }

  // PUT
  updateById(id, task) {
    return axios.put(TASK_API_URL + '/' + id, task);
  }

  // DELETE
  deleteAll() {
    return axios.delete(TASK_API_URL);
  }

  deleteById(id) {
    return axios.delete(TASK_API_URL + '/' + id);
  }

  deleteAllCompleted() {
    return axios.delete(TASK_API_URL + 'completed');
  }
}

export default new TaskService();
