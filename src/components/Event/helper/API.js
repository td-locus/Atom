import axios from "axios";

const FetchEvent = async (eventId) => {
  try {
    const response = await axios.get(`/api/events/edit?eventId=${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const UpdateEvent = async (event) => {
  try {
    const response = await axios.patch(`/api/events/edit`, event, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

const DeleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`/api/events/delete?eventId=${eventId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

export { FetchEvent, UpdateEvent, DeleteEvent };
