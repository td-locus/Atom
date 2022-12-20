import React, { useEffect, useContext, useRef } from "react";
import { useImmerReducer } from "use-immer";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage, login, showLoading, hideLoading, showErrorMessage } from "../../reducer/actions";

// import css
import "../../css/Auth/Auth.css";
import "../../css/Reusable/Simplebar.css";
import "simplebar/src/simplebar.css";

//import images
import logo from "../../images/logo.png";
import google from "../../images/google.png";

import { FormGroup } from "reactstrap";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SimpleBarReact from "simplebar-react";
import { withRouter, Link, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { GoogleSigninHelper, SignupHelper } from "./helper/Auth";
import { isEmailTaken, isUsernameTaken, CreateAudit } from "./helper/functions";

const Signup = () => {
  const history = useHistory();
  const { dispatch } = useContext(DispatchContext);

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
      dispatch(login(responseValues.response.user));
      await CreateAudit(responseValues.status === 200 ? "login" : "signup", responseValues.status === 200 ? "You logged in." : "You created an account.");
      history.push("/my-space");
      dispatch(showFlashMessage("success", responseValues.status === 201 ? "Account has been created successfully!" : "Logged in successfully!"));
    } else {
      dispatch(showErrorMessage());
    }
  };
  const responseGoogleFailed = (response) => {
    dispatch(showErrorMessage());
  };

  const height = window.innerHeight * 0.9;

  const initialState = {
    showPass: false,
    name: "",
    email: "",
    username: "",
    password: "",
  };
  const signupReducer = (draft, action) => {
    switch (action.type) {
      case "updateName":
        draft.name = action.value;
        break;
      case "updateEmail":
        draft.email = action.value;
        break;
      case "updateUsername":
        draft.username = action.value;
        break;
      case "updatePassword":
        draft.password = action.value;
        break;
      case "setShowPass":
        draft.showPass = !draft.showPass;
        break;

      default:
        console.log("An Error occurred");
    }
  };
  const [state, dispatchEvent] = useImmerReducer(signupReducer, initialState);

  useEffect(() => {
    ValidatorForm.addValidationRule("isUsernameTaken", () => {
      return true;
    });

    ValidatorForm.addValidationRule("isEmailTaken", () => {
      return true;
    });
    ValidatorForm.addValidationRule("isPasswordValid", (value) => {
      if (value.length < 8) return false;
      return true;
    });
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule("isUsernameTaken", () => {
      return true;
    });
    ValidatorForm.addValidationRule("isUsernameValid", () => {
      if (state.username.length < 4 || state.username.length > 12) return false;
      return true;
    });
  }, [state.username]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isEmailTaken", () => {
      return true;
    });
  }, [state.email]);

  const username = useRef();
  const email = useRef();

  const handleSignup = async () => {
    dispatch(showLoading());

    const credentials = { ...state };
    delete credentials.showPass;

    const usernameError = await isUsernameTaken(credentials.username);
    if (usernameError) {
      dispatch(hideLoading());

      ValidatorForm.addValidationRule("isUsernameTaken", () => {
        return false;
      });
      username.current.validate();
    }
    const emailError = await isEmailTaken(credentials.email);
    if (emailError) {
      dispatch(hideLoading());

      ValidatorForm.addValidationRule("isEmailTaken", () => {
        return false;
      });
      email.current.validate();
    }
    if (!usernameError && !emailError) {
      const responseValues = await SignupHelper(credentials);
      dispatch(hideLoading());

      if (responseValues.status === 201) {
        await CreateAudit("signup", "You created an account.");
        dispatch(login(responseValues.response.user));
        history.push("/my-space");
        dispatch(showFlashMessage("success", "Account has been created successfully!"));
      } else {
        dispatch(showErrorMessage());
      }
    }
  };
  return (
    <div className="auth-form-container signup">
      <SimpleBarReact style={{ maxHeight: height }}>
        <div className="image">
          <img src={logo} alt="Main Logo" className="auth-logo" />
        </div>
        <div className="auth-form">
          <h2>Signup</h2>
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
            <span>or Sign up with Email</span>
          </div>
          <ValidatorForm className="login-form" onError={(errors) => console.log(errors)} onSubmit={handleSignup}>
            <FormGroup className="mb-4">
              <TextValidator
                label="Full Name *"
                onChange={(e) => dispatchEvent({ type: "updateName", value: e.target.value })}
                name="name"
                fullWidth
                value={state.name}
                validators={["required"]}
                errorMessages={["This field is required."]}
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <TextValidator
                ref={username}
                label="Username *"
                onChange={(e) => dispatchEvent({ type: "updateUsername", value: e.target.value })}
                name="username"
                fullWidth
                value={state.username}
                validators={["required", "isUsernameValid", "isUsernameTaken"]}
                errorMessages={["This field is required.", "Username must be between 4 and 12 characters.", "Username already taken."]}
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <TextValidator
                ref={email}
                label="Personal Email *"
                onChange={(e) => dispatchEvent({ type: "updateEmail", value: e.target.value })}
                name="email"
                fullWidth
                value={state.email}
                validators={["required", "isEmail", "isEmailTaken"]}
                errorMessages={["This field is required.", "Please enter a valid email.", "An account with this email already exists."]}
              />
            </FormGroup>

            <FormGroup className="mb-4">
              <TextValidator
                label="Password *"
                type={state.showPass ? "text" : "password"}
                onChange={(e) => dispatchEvent({ type: "updatePassword", value: e.target.value })}
                name="password"
                fullWidth
                value={state.password}
                validators={["required", "isPasswordValid"]}
                errorMessages={["This field is required.", "Must have atleast 8 characters."]}
              />
              <FormControlLabel control={<Checkbox checked={state.showPass} onChange={() => dispatchEvent({ type: "setShowPass" })} />} label="Show password" />
            </FormGroup>
            <Button className="auth-button" variant="contained" type="submit">
              Signup
            </Button>
            <div className="bottom-text">
              Already registered? <Link to="/auth">Sign in</Link>
            </div>
          </ValidatorForm>
        </div>
      </SimpleBarReact>
    </div>
  );
};

export default withRouter(Signup);
