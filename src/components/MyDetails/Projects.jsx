import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const Projects = () => {
  const history = useHistory();
  return (
    <>
      <Button variant="contained" startIcon={<ControlPointIcon />} onClick={() => history.push("/project")}>
        Add new project
      </Button>
    </>
  );
};

export default Projects;
