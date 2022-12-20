import React, { useState, useContext, useEffect, useRef } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading, showFlashMessage, showErrorMessage } from "../../reducer/actions";

import { useHistory } from "react-router-dom";
// import css
import "../../css/Auth/Auth.css";
//import logo
import logo from "../../images/logo.png";
import { FormGroup } from "reactstrap";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { withRouter, Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { CheckEmailAndSendOTP, ResetPassword } from "./helper/Auth";

const ForgotPassword = () => {
  const history = useHistory();
  const emailInput = useRef(null);
  const otpInput = useRef(null);
  const { dispatch } = useContext(DispatchContext);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const sendCode = async () => {
    dispatch(showLoading());
    const { status, otp } = await CheckEmailAndSendOTP(email);
    dispatch(hideLoading());

    if (status === 403) {
      ValidatorForm.addValidationRule("isEmailExisting", () => {
        return false;
      });
      emailInput.current.validate();
    } else if (status === 400) {
      dispatch(showFlashMessage("error", "You have created an account with Google OAuth."));
    } else dispatch(showFlashMessage("success", "Code sent successfully! Check your spam folder."));
    setCodeSent(otp);
    setShowCode(true);
  };

  const verifyCode = () => {
    if (code === codeSent) {
      dispatch(showFlashMessage("success", "Code verified successfully!"));
      setShowPasswordInput(true);
    } else {
      ValidatorForm.addValidationRule("isCodeValid", () => {
        return false;
      });
      otpInput.current.validate();
    }
  };

  const changePassword = async () => {
    const status = await ResetPassword(email, password);
    if (status === 200) {
      history.push("/auth");
      dispatch(showFlashMessage("success", "Password changed successfully!"));
    } else {
      dispatch(showErrorMessage());
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isCodeValid", () => {
      return true;
    });
    ValidatorForm.addValidationRule("isEmailExisting", () => {
      return true;
    });
  }, []);
  useEffect(() => {
    ValidatorForm.addValidationRule("isCodeValid", () => {
      return true;
    });
  }, [code]);
  useEffect(() => {
    ValidatorForm.addValidationRule("isEmailExisting", () => {
      return true;
    });
  }, [email]);
  return (
    <div className="auth-form-container forgot-password">
      <div className="image">
        <img src={logo} alt="Main Logo" className="auth-logo" />
      </div>
      <div className="auth-form">
        <h2>Reset Password</h2>

        {!showPasswordInput && (
          <ValidatorForm
            className="login-form"
            onSubmit={() => {
              !showCode ? sendCode() : verifyCode();
            }}
          >
            <FormGroup className={!showCode ? "mb-3" : "mb-2"}>
              <TextValidator
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                fullWidth
                value={email}
                validators={["required", "isEmail", "isEmailExisting"]}
                errorMessages={["This field is required.", "Not a valid email.", "No account with this email was found."]}
                autoComplete="off"
                disabled={showCode}
                ref={emailInput}
              />
            </FormGroup>
            {showCode && (
              <div className="change-email mb-3" onClick={() => setShowCode(false)}>
                Change email?
              </div>
            )}
            {showCode && (
              <FormGroup className="mb-3">
                <TextValidator
                  label="Code"
                  onChange={(e) => setCode(e.target.value)}
                  name="code"
                  fullWidth
                  value={code}
                  validators={["required", "isCodeValid"]}
                  errorMessages={["This field is required.", "You've entered an incorrect code."]}
                  autoComplete="off"
                  ref={otpInput}
                />
              </FormGroup>
            )}

            {!showCode ? (
              <Button className="auth-button" variant="contained" type="submit">
                Send Code
              </Button>
            ) : (
              <Button className="auth-button" variant="contained" type="submit">
                Verify code
              </Button>
            )}
            <div className="bottom-text mt-3">
              Not registered yet? <Link to="/auth/signup">Sign up</Link>
            </div>
          </ValidatorForm>
        )}
        {showPasswordInput && (
          <ValidatorForm onSubmit={changePassword}>
            <FormGroup className="mt-3">
              <TextValidator
                label="New Password"
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
            <Button className="auth-button" variant="contained" type="submit">
              Change Password
            </Button>

            <div className="bottom-text mt-3">
              Not registered yet? <Link to="/auth/signup">Sign up</Link>
            </div>
          </ValidatorForm>
        )}
      </div>
    </div>
  );
};

export default withRouter(ForgotPassword);
