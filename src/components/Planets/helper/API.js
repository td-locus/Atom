import axios from "axios";

const FetchDomains = async () => {
  try {
    const response = await axios.get("/api/domains", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};
export { FetchDomains };
