import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import { Container, Row, Col } from "reactstrap";
import Member from "./Member";
import ElectronsHeader from "./ElectronsHeader";

import { FetchElectrons } from "./helper/API";

const Electrons = () => {
  const { dispatch } = useContext(DispatchContext);
  const [electrons, setElectrons] = useState([]);
  const [originalElectrons, setOriginalElectrons] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  useEffect(() => {
    dispatch(showLoading());
    const fetchElectrons = async () => {
      const electrons = await FetchElectrons();
      console.log(electrons);
      setElectrons(electrons);
      setOriginalElectrons(electrons);
      dispatch(hideLoading());
      setRequestCount(requestCount + 1);
    };
    fetchElectrons();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <Container fluid className="auth-layout py-3">
      <ElectronsHeader electrons={electrons} setElectrons={setElectrons} originalElectrons={originalElectrons} />
      <Row className="mt-2 g-3">
        {electrons.length > 0 &&
          electrons.map((electron) => {
            return (
              <Col sm="6" lg="4" xl="3" key={electron._id}>
                <Member data={electron} />
              </Col>
            );
          })}
        {electrons.length === 0 && requestCount > 0 && (
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: "70vh" }}>
            No users found.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Electrons;
