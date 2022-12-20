import axios from "axios";

const fetchGeneral = async () => {
  try {
    const response = await axios.get("/api/general", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const postGeneral = async (data) => {
  try {
    const response = await axios.post("/api/general", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const updateAvatar = async (avatar) => {
  try {
    const response = await axios.post(
      "/api/avatar",
      { avatar },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return { status: response.status, response: response.data.user };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const removeAvatar = async () => {
  try {
    const response = await axios.delete("/api/avatar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data.user };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const addSocial = async (data) => {
  try {
    const response = await axios.post("/api/social", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data.user };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const getSocial = async () => {
  try {
    const response = await axios.get("/api/social", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data.links };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const deleteAccount = async () => {
  try {
    const response = await axios.delete("/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data.links };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const addDetails = async (data) => {
  try {
    const response = await axios.post("/api/personal", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data.user };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const getDetails = async () => {
  try {
    const response = await axios.get("/api/personal", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { status: response.status, response: response.data };
  } catch (err) {
    return { status: err.response.status, response: err.response.data };
  }
};

const isEmailAvailable = async (email) => {
  try {
    await axios.post(
      "/api/isEmailAvailable",
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return false;
  } catch (err) {
    // console.log(err.response);
    return true;
  }
};

const isUsernameAvailable = async (username) => {
  try {
    await axios.post(
      "/api/isUsernameAvailable",
      {
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return false;
  } catch (err) {
    // console.log(err.response);
    return true;
  }
};

const isPasswordMatching = async (password) => {
  try {
    await axios.post(
      "/api/isPasswordMatching",
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return true;
  } catch (err) {
    // console.log(err.response);
    return false;
  }
};

const changePassword = async (password) => {
  try {
    await axios.post(
      "/api/changePassword",
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return true;
  } catch (err) {
    // console.log(err.response);
    return false;
  }
};

export {
  fetchGeneral,
  postGeneral,
  updateAvatar,
  removeAvatar,
  addSocial,
  getSocial,
  deleteAccount,
  addDetails,
  getDetails,
  isEmailAvailable,
  isUsernameAvailable,
  isPasswordMatching,
  changePassword,
};
