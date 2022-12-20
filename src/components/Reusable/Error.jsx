import React from "react";
import { Container, Button } from "reactstrap";
import "../../css/Reusable/Error.css";

const Error = () => {
  return (
    <Container fluid className="auth-layout py-3">
      <div className="Error">
        <div className="content text-start">
          <h1>404</h1>
          <h6 className="main-heading">Oops. We can't seem to find the page you're looking for.</h6>
          <Button className="max-z-index" onClick={() => {window.location.replace("/");}}>Back to home</Button>
        </div>
        <div className="gif">
          <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_img" className="img-fluid" />
        </div>
      </div>
    </Container>
  );
};

export default Error;
