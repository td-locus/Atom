import axios from "axios";

const isEmailTaken = async (email) => {
  try {
    await axios.post("/api/isEmailTaken", {
      email,
    });
    return false;
  } catch (err) {
    // console.log(err.response);
    return true;
  }
};

const isUsernameTaken = async (username) => {
  try {
    await axios.post("/api/isUsernameTaken", {
      username,
    });
    return false;
  } catch (err) {
    // console.log(err.response);
    return true;
  }
};

const CreateAudit = async (type, log) => {
  try {
    const response = await axios.post(
      "/api/audit",
      {
        type,
        log,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.status;
  } catch (err) {
    console.error(err.response);
    return err.response.status;
  }
};

export { isEmailTaken, isUsernameTaken, CreateAudit };
