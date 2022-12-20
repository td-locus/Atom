import axios from "axios";

const FetchElectrons = async () => {
  try {
    const response = await axios.get("/api/electrons", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export { FetchElectrons };
