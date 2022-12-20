import React, { useEffect, useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";

import { useLocation } from "react-router-dom";

import { Col, Container, Row } from "reactstrap";

import Event from "./Event";
import WPSHeader from "./WPSHeader";
import ModalEvent from "./ModalEvent";

import { FetchEvents } from "./helper/API";

const WPS = () => {
  const { dispatch } = useContext(DispatchContext);

  const [events, setEvents] = useState([]);
  const [sort, setSort] = useState("default");
  const [order, setOrder] = useState("asc");
  const [date, setDate] = useState("all");
  const [type, setType] = useState("all");

  const toggleDate = (e) => setDate(e.target.value);
  const toggleSort = (e) => setSort(e.target.value);
  const toggleOrder = (e) => setOrder(e.target.value);
  const toggleType = (e) => setType(e.target.value);

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [count, setCount] = useState(0);

  const location = useLocation();
  const eventId = location.search.split("=")[1];
  const [requestCount, setRequestCount] = useState(0);

  const fetchEvents = async () => {
    const responseValues = await FetchEvents(sort, order, date, type);
    setEvents(responseValues.response);
    setCount(count + 1);
    dispatch(hideLoading());
    setRequestCount(requestCount + 1);
  };

  useEffect(() => {
    dispatch(showLoading());
    fetchEvents();
  }, [sort, order, date, type]);

  useEffect(() => {
    if (count) {
      for (let i = 0; i < events.length; i++) {
        if (events[i]._id === eventId) {
          setSelectedEvent(events[i]);
          handleOpen();
        }
      }
    }
  }, [count]);

  const props = {
    sort,
    order,
    date,
    type,
    toggleSort,
    toggleOrder,
    toggleDate,
    toggleType,
  };

  return (
    <Container fluid className="auth-layout py-3 Event">
      <WPSHeader {...props} />
      <ModalEvent open={open} handleClose={handleClose} selectedEvent={selectedEvent} />
      <Row>
        {events.length > 0 &&
          events !== undefined &&
          events.map((event) => {
            return (
              <Col sm={12} md={6} xl={4} key={event._id}>
                <Event event={event} handleOpen={handleOpen} setSelectedEvent={setSelectedEvent} />
              </Col>
            );
          })}
        {events.length === 0 && requestCount > 0 && (
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: "70vh" }}>
            No upcoming events.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default WPS;
