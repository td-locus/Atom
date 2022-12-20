import axios from "axios";

const FetchTask = async (taskId) => {
  try {
    const response = await axios.get(`/api/task/edit?taskId=${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const UpdateTask = async (event) => {
  try {
    const response = await axios.patch(`/api/task/edit`, event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

const DeleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`/api/task/delete?taskId=${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

export { FetchTask, UpdateTask, DeleteTask };
