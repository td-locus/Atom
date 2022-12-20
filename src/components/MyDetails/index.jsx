import React, { useEffect } from "react";
import { Container } from "reactstrap";
import MyDetailsForm from "./MyDetailsForm";

const MyDetails = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <Container fluid className="auth-layout">
      <MyDetailsForm />
    </Container>
  );
};

export default MyDetails;
