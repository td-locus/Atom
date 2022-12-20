import React from "react";
import { Container } from "reactstrap";
import "../../css/Molecules/Molecules.css";
import construction from "../../images/construction.gif";

const Molecules = () => {
  return (
    <Container fluid className="auth-layout">
      <div className="bg">
        <img src={construction} alt="construction" className="img-fluid" />
        <small className="text-muted my-3">We are currently working on this page.</small>
      </div>
    </Container>
  );
};

export default Molecules;
