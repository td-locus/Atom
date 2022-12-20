import axios from "axios";

const GetTasksAssignee = async () => {
  try {
    const response = await axios.get(`/api/tasks/assignee`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { tasks: response.data.tasks, user: response.data.user };
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const MarkTask = async (task) => {
  try {
    const response = await axios.patch(`/api/task/mark`, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

export { GetTasksAssignee, MarkTask };
