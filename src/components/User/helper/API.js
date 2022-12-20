import axios from "axios";

const FetchUser = async (username) => {
  try {
    const response = await axios.get(`/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export { FetchUser };
