import React, { useContext } from "react";
import StateContext from "../context/StateContext";

import { Route, Redirect, Switch } from "react-router-dom";
import Error from "../components/Reusable/Error";
import Auth from "../components/Auth/index";

import { authenticatedRoutes } from "./index";

const AppRoutes = () => {
  const { state } = useContext(StateContext);
  return (
    <Switch>
      {/* Default / route redirect handling */}
      <Route exact path="/">
        {!state.loggedIn && <Redirect to="/auth" />}
        {state.loggedIn && <Redirect to="/my-space" />}
      </Route>
      <Route exact path="/auth">
        {state.loggedIn ? <Redirect to="/my-space" /> : <Auth />}
      </Route>

      {/* Unauthenticated routes */}
      <Route path="/auth" component={Auth} />

      {/* Authenticated routes */}
      {authenticatedRoutes.map((route, idx) => {
        const Component = route.component;
        return (
          <Route
            key={idx}
            path={route.path}
            render={(props) => {
              if (!state.loggedIn) {
                return <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />;
              }
              return <Component {...props} />;
            }}
          />
        );
      })}

      {/* Fallback route */}
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
