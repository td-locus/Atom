import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import { Container, Row, Col } from "reactstrap";
import Skeleton from "@mui/material/Skeleton";
import ProtonsHeader from "./ProtonsHeader";
import Member from "./Member";

import { FetchProtons } from "./helper/API";

const Protons = () => {
  const { dispatch } = useContext(DispatchContext);

  const [protons, setProtons] = useState([]);
  const [originalProtons, setOriginalProtons] = useState([]);
  const [domain, setDomain] = useState("all");
  const [role, setRole] = useState("all");
  const [requestCount, setRequestCount] = useState(0);

  const handleDomain = (e) => {
    setDomain(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const props = {
    domain,
    role,
    originalProtons,
    setProtons,
    handleDomain,
    handleRole,
  };

  useEffect(() => {
    dispatch(showLoading());

    const fetchProtons = async () => {
      const protons = await FetchProtons(domain, role);
      setProtons(protons);
      setOriginalProtons(protons);
      dispatch(hideLoading());
      setRequestCount(requestCount + 1);
    };
    fetchProtons();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    dispatch(showLoading());
    const fetchProtons = async () => {
      const protons = await FetchProtons(domain, role);
      setProtons(protons);
      setOriginalProtons(protons);
      dispatch(hideLoading());
    };
    fetchProtons();
  }, [domain, role]);
  return (
    <Container fluid className="auth-layout py-3">
      <ProtonsHeader {...props} />
      <Row className="mt-2">
        {protons.length > 0 &&
          protons.map((proton) => {
            return (
              <Col sm="6" lg="4" xl="3" key={proton._id} className="mb-3">
                <Member data={proton} />
              </Col>
            );
          })}

        {protons.length === 0 &&
          requestCount === 0 &&
          [...Array(12)].map((_, i) => (
            <Col sm="6" lg="4" xl="3" key={i} className="mb-3">
              <Skeleton variant="rect" height={300} sx={{ borderRadius: 1 }} />
            </Col>
          ))}

        {protons.length === 0 && requestCount > 0 && (
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: "70vh" }}>
            No users found.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Protons;
