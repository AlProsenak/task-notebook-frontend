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

  getAllCompleted(completed) {
    return axios.get(TASK_API_URL + `/completed-${completed}`);
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

  deleteAllCompleted(completed) {
    return axios.delete(TASK_API_URL + `/completed-${completed}`);
  }
}

export default new TaskService();
