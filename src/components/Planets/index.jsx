import React, { useState, useEffect, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import { Container, Row } from "reactstrap";

import PlanetsHeader from "./PlanetsHeader";
import Domain from "./Domain";
import { FetchDomains } from "./helper/API";

const Planets = () => {
  const { dispatch } = useContext(DispatchContext);
  const [domains, setDomains] = useState([]);
  useEffect(() => {
    dispatch(showLoading());
    const fetchDomains = async () => {
      const domains = await FetchDomains();
      setDomains(domains.reverse());
      dispatch(hideLoading());
    };
    fetchDomains();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <Container fluid className="auth-layout py-3">
      <PlanetsHeader />
      {domains.length > 0 &&
        domains.map((domain, index) => {
          return (
            <Row className="mt-3 px-2" key={index}>
              <Domain domain={domain} />
            </Row>
          );
        })}
    </Container>
  );
};

export default Planets;
