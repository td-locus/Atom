import React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";

import { Card, CardBody, Row, Col } from "reactstrap";
import moment from "moment";

const Member = ({ data }) => {
  return (
    <Card className="member__card">
      <CardBody>
        <Row className="electron g-2">
          <Col xs="3" lg="4" md="3" className="electronImage text-center">
            <Avatar alt={data.name} src={data.avatar ? data.avatar : data.defaultAvatar} />
          </Col>
          <Col xs="9" lg="8" md="9">
            <div className="electronDetails" style={{ width: "100%", whiteSpace: "nowrap" }}>
              <Box component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                <Tooltip title={data.name} arrow placement="top-start">
                  <span className="name">{data.name}</span>
                </Tooltip>
                <br />

                <Tooltip title={data.email} arrow placement="top-start">
                  <small>{data.email}</small>
                </Tooltip>
                <div className="text-overflow">
                  <small>Joined: {moment(data.createdAt).format("MMM Do YY")}</small>
                </div>
              </Box>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Member;
