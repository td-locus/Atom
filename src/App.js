import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// Components
import Sidebar from "./components/Reusable/Sidebar";
import AppRoutes from "./routes/route";

// import context
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import { useImmerReducer } from "use-immer";

import { reducer, initialState } from "./reducer/reducer";

import axios from "axios";
import { hideFlashMessage } from "./reducer/actions";
import { ErrorBoundary } from "./components/Reusable/ErrorBoundary";
import Error from "./components/Reusable/Error";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:5000";
  // axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
}

const App = () => {
  const handleClose = () => {
    dispatch(hideFlashMessage());
  };
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("name", state.user.name);
      localStorage.setItem("defaultAvatar", state.user.defaultAvatar);
      localStorage.setItem("username", state.user.username);
      localStorage.setItem("title", state.user.title || "");
      localStorage.setItem("avatar", state.user.avatar || "");
      localStorage.setItem("role", state.user.role || "");
    }
  }, [state.loggedIn]);

  function errorHandler(error, errorInfo){
    console.log("Logging", {error, errorInfo})
  }

  return (
    <ErrorBoundary>
      <DispatchContext.Provider value={{ dispatch }}>
        <StateContext.Provider value={{ state }}>
          <Router>
            {/* Flash Messages */}
            <Snackbar open={state.showFlashMessage} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
              <Alert onClose={handleClose} severity={state.flashMessageType} variant="standard" sx={{ width: "100%" }}>
                {state.flashMessage}
              </Alert>
            </Snackbar>

            {/* Loader */}
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={state.showLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>

            {/* Sidebar */}
            {state.loggedIn && <Sidebar />}
            <AppRoutes />
          </Router>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ErrorBoundary>
  );
};

export default App;