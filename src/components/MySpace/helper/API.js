import axios from "axios";

const FetchAudits = async () => {
  try {
    const response = await axios.get("/api/audit", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const FetchInterests = async () => {
  try {
    const response = await axios.get("/api/getInterests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { interests: response.data.interests, website: response.data.website };
  } catch (err) {
    return err.response;
  }
};

const CreateEvent_ = async (data) => {
  try {
    const response = await axios.post("/api/event", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, data: response.data };
  } catch (err) {
    return err.response;
  }
};
const FetchProfileCompleted = async () => {
  try {
    const response = await axios.get("/api/profileCompleted", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const FetchEventsByMe = async () => {
  try {
    const response = await axios.get("/api/events/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const FetchUpcomingEvents = async () => {
  try {
    const response = await axios.get(`/api/events?sort=start&order=desc&dateRange=upcoming&limit=3&type=all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { response: response.data, status: response.status };
  } catch (err) {
    return { status: err.response.status };
  }
};

const CheckOrder = async () => {
  try {
    const response = await axios.get(`/api/checkOrder`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    console.log(err.response.status);
    return err.response.status;
  }
};

const GetAssignees = async () => {
  try {
    const response = await axios.get(`/api/assignees`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const CreateTask_ = async (data) => {
  try {
    const response = await axios.post("/api/task", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

const GetTasksAssignor = async () => {
  try {
    const response = await axios.get(`/api/tasks/assignor`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const GetTasksAssignee = async () => {
  try {
    const response = await axios.get(`/api/tasks/assignee?completed=false`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export { FetchAudits, CreateEvent_, FetchInterests, FetchProfileCompleted, FetchEventsByMe, FetchUpcomingEvents, CheckOrder, GetAssignees, CreateTask_, GetTasksAssignor, GetTasksAssignee };
