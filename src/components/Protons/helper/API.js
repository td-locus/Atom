import axios from "axios";

const FetchProtons = async (domain, role) => {
  try {
    const response = await axios.get(`/api/protons?domain=${domain}&role=${role}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export { FetchProtons };
