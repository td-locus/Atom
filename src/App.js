import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
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

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:9000";
} else {
  axios.defaults.baseURL = "https://glossy-metric-286808.uc.r.appspot.com";
}

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(37, 150, 190)",
    },
  },
});

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

  return (
    <ErrorBoundary>
      <DispatchContext.Provider value={{ dispatch }}>
        <StateContext.Provider value={{ state }}>
          <Router>
            {/* Flash Messages */}
            <Snackbar
              open={state.showFlashMessage}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
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
            <ThemeProvider theme={theme}>
              <AppRoutes />
            </ThemeProvider>
          </Router>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
