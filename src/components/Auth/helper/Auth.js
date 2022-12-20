import axios from "axios";
import Cryptr from "cryptr";
const cryptr = new Cryptr("atom.thinkdigitalsrm");

const LoginHelper = async (credentials) => {
  try {
    const response = await axios.post("/api/login", {
      email: credentials.email,
      password: credentials.password,
    });
    localStorage.setItem("authToken", response.data.token);
    return { response: response.data, status: response.status };
  } catch (err) {
    console.error(err.response);
    return { status: err.response.status, response: err.response };
  }
};

const SignupHelper = async (credentials) => {
  try {
    const response = await axios.post("/api/signup", {
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
      username: credentials.username,
    });
    localStorage.setItem("authToken", response.data.token);

    return { response: response.data, status: response.status };
  } catch (err) {
    console.error(err.response);
    return { status: err.response.status, response: err.response };
  }
};

const GoogleSigninHelper = async (credentials) => {
  try {
    const response = await axios.post("/api/google", {
      email: credentials.email,
      name: credentials.name,
      username: credentials.username,
      avatar: credentials.imageUrl,
    });
    localStorage.setItem("authToken", response.data.token);
    // console.log(response.data.avatar);
    return { response: response.data, status: response.status };
  } catch (err) {
    console.log(err.response);
    return { status: err.response.status, response: err.response };
  }
};

const LogoutHelper = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("defaultAvatar");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      localStorage.removeItem("title");
      localStorage.removeItem("avatar");
      localStorage.removeItem("count");
      if (localStorage.getItem("googleAuthToken")) {
        localStorage.removeItem("googleAuthToken");
      }
      resolve();
    }, 2000);
  });
};

const GetRole = async () => {
  try {
    const response = await axios.get("/api/role", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err.response);
    return err.response;
  }
};

const CheckEmailAndSendOTP = async (email) => {
  try {
    const response = await axios.post("/api/checkEmail", { email });
    // console.log(response.data)
    return { status: response.status, otp: cryptr.decrypt(response.data.OTP) };
  } catch (err) {
    return { status: err?.response?.status };
  }
};

const ResetPassword = async (email, password) => {
  try {
    const response = await axios.post("/api/resetPassword", { email, password });
    // console.log(response.data)
    return response.status;
  } catch (err) {
    return err?.response?.status;
  }
};

export { LoginHelper, SignupHelper, GoogleSigninHelper, LogoutHelper, GetRole, CheckEmailAndSendOTP, ResetPassword };
