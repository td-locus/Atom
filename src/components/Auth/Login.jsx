import React, { useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage, login, showLoading, hideLoading, showErrorMessage } from "../../reducer/actions";

// import css
import "../../css/Auth/Auth.css";
//import logo
import logo from "../../images/logo.png";
import google from "../../images/google.png";

import { FormGroup } from "reactstrap";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { withRouter, Link, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { GoogleSigninHelper, LoginHelper } from "./helper/Auth";
import { CreateAudit } from "./helper/functions";

const Login = () => {
  const { dispatch } = useContext(DispatchContext);
  const history = useHistory();

  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const responseGoogleSuccess = async (res) => {
    dispatch(showLoading());
    const { accessToken, profileObj } = res;
    localStorage.setItem("googleAuthToken", accessToken);
    const { email, name, imageUrl } = profileObj;
    const username = email.split("@")[0].slice(0, 12);

    const credentials = { email, name, imageUrl, username };
    const responseValues = await GoogleSigninHelper(credentials);
    dispatch(hideLoading());

    if (responseValues.status === 201 || responseValues.status === 200) {
      // console.log(responseValues.response.user);
      dispatch(login(responseValues.response.user));
      await CreateAudit(responseValues.status === 200 ? "login" : "signup", responseValues.status === 200 ? "You logged in." : "You created an account.");
      document.cookie += " ;show=true";
      history.push("/my-space");
      dispatch(showFlashMessage("success", responseValues.status === 201 ? "Account has been created successfully!" : "Logged in successfully!"));
    } else {
      dispatch(showErrorMessage());
    }
  };
  const responseGoogleFailed = (response) => {
    console.log(response);
    dispatch(showErrorMessage());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    const creds = { email: credentials, password };
    const responseValues = await LoginHelper(creds);
    dispatch(hideLoading());
    if (responseValues.status === 200) {
      dispatch(login(responseValues.response.user));
      await CreateAudit("login", "You logged in.");
      history.push("/my-space");
      dispatch(showFlashMessage("success", "Logged in successfully!"));
    } else {
      dispatch(showFlashMessage("error", "Login failed! Invalid email or password."));
    }
  };
  return (
    <div className="auth-form-container login">
      <div className="image">
        <img src={logo} alt="Main Logo" className="auth-logo" />
      </div>
      <div className="auth-form">
        <h2>Login</h2>
        <p className="text-muted">Hey there, welcome to Atom!</p>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <div className="google-signin text-center">
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-oauth">
                <img src={google} alt="Google Icon" /> Sign in with Google
              </button>
            </div>
          )}
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailed}
        />
        <div id="or" className="text-center">
          <div className="line"></div>
          <span>or Sign in with Email</span>
        </div>
        <ValidatorForm className="login-form" onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <TextValidator
              label="Email"
              onChange={(e) => setCredentials(e.target.value)}
              name="email"
              fullWidth
              value={credentials}
              validators={["required", "isEmail"]}
              errorMessages={["This field is required.", "Not a valid email."]}
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup>
            <TextValidator
              label="Password"
              type={!showPass ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              fullWidth
              value={password}
              validators={["required"]}
              errorMessages={["This field is required."]}
            />
            <FormControlLabel control={<Checkbox checked={showPass} onChange={() => setShowPass((draft) => !draft)} />} label="Show password" />
          </FormGroup>
          <div className="forgot">
            <Link to="/auth/reset" className="forgot-pass">
              Forgot Password?
            </Link>
          </div>
          <Button className="auth-button" variant="contained" type="submit">
            Login
          </Button>
          <div className="bottom-text">
            Not registered yet? <Link to="/auth/signup">Sign up</Link>
          </div>
        </ValidatorForm>
      </div>
    </div>
  );
};

export default withRouter(Login);
