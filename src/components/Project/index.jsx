import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import AddProject from "./AddProject";

const Project = () => {
  return (
    <Container fluid className="auth-layout py-3">
      <div className="heading d-flex justify-content-between">
        <h3>Add Project</h3>
      </div>
      <Container className="py-5">
        <AddProject />
      </Container>
    </Container>
  );
};

export default Project;
