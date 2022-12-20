import React from "react";
import "../../css/Auth/index.css";
//import logo
import login from "../../images/login-page.png";
import { Row, Col, Container } from "reactstrap";

import { withRouter, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
const Auth = () => {
  return (
    <div className="auth">
      <Container fluid className="p-0">
        <Row>
          <Col lg={8} md={6} sm={12} className="p-0">
            <div className="bg-overlay">
              <img src={login} alt="" />
            </div>
          </Col>
          <Col lg={4} md={6} sm={12} className="p-0" style={{ position: "relative" }}>
            <Switch>
              <Route path="/auth" exact>
                <Login />
              </Route>
              <Route path="/auth/signup" exact>
                <Signup />
              </Route>
              <Route path="/auth/reset" exact>
                <ForgotPassword />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Auth);
