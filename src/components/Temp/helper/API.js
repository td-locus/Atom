import axios from "axios";

const ConfirmOrder = async (data) => {
  try {
    const response = await axios.post(`/api/confirmOrder`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.status;
  } catch (err) {
    return err.response.status;
  }
};

export { ConfirmOrder };
