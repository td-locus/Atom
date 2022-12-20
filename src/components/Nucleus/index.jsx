import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import { Container, Row, Col } from "reactstrap";
import Skeleton from "@mui/material/Skeleton";
import Member from "./Member";
import NucleusHeader from "./NucleusHeader";
import { FetchNucleus } from "./helper/API";

const Nucleus = () => {
  const { dispatch } = useContext(DispatchContext);
  const [nucleus, setNucleus] = useState([]);
  const [originalNucleus, setOriginalNucleus] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    dispatch(showLoading());

    const fetchNucleus = async () => {
      const nucleus = await FetchNucleus();
      console.log(nucleus);
      setNucleus(nucleus);
      setOriginalNucleus(nucleus);
      dispatch(hideLoading());
      setRequestCount(requestCount + 1);
    };
    fetchNucleus();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <Container fluid className="auth-layout py-3">
      <NucleusHeader nucleus={nucleus} setNucleus={setNucleus} originalNucleus={originalNucleus} />
      <Row className="g-3">
        {nucleus.length > 0 &&
          nucleus.map((n) => {
            return (
              <Col sm="6" lg="4" xl="3" key={n._id} className="mb-3">
                <Member data={n} />
              </Col>
            );
          })}
        {nucleus.length === 0 &&
          requestCount === 0 &&
          [...Array(12)].map((_, i) => (
            <Col sm="6" lg="4" xl="3" key={i} className="mb-3">
              <Skeleton variant="rect" height={300} sx={{ borderRadius: 1 }} />
            </Col>
          ))}
        {nucleus.length === 0 && requestCount > 0 && (
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: "70vh" }}>
            No users found.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Nucleus;
