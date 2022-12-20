import axios from "axios";

const FetchNucleus = async () => {
  try {
    const response = await axios.get("/api/nucleus", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export { FetchNucleus };
