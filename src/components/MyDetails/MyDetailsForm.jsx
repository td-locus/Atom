import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../css/MyDetails/MyDetails.css";
import { Container } from "reactstrap";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import CircleIcon from "@mui/icons-material/Circle";
// Components
import General from "./General";
import Account from "./Account";
import Personal from "./Personal";
import Projects from "./Projects";
import Social from "./Social";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const MyDetailsForm = () => {
  const [value, setValue] = useState(0);
  const [orientation, setOrientation] = useState("vertical");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (window.innerWidth < 900) setOrientation("horizontal");
    else setOrientation("vertical");
  }, []);
  useLayoutEffect(() => {
    const updateOrientation = () => {
      if (window.innerWidth < 900) setOrientation("horizontal");
      else setOrientation("vertical");
    };
    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return (
    <Container className="my-details-form pb-3">
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} md={3} px={3}>
          <Tabs value={value} onChange={handleChange} aria-label="Profile Tabs" orientation={orientation}>
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Account" {...a11yProps(1)} />
            <Tab label="Personal" {...a11yProps(2)} />
            {/* <Tab label="Projects" {...a11yProps(3)} /> */}
            <Tab label="Social" {...a11yProps(3)} />
          </Tabs>
        </Grid>
        <Divider orientation={orientation} flexItem>
          <CircleIcon style={{ fontSize: 10, color: "rgba(0,0,0,0.1)" }} />
        </Divider>
        <Grid item xs={12} md={8}>
          <TabPanel value={value} index={0}>
            <General />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Account />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Personal />
          </TabPanel>
          {/* <TabPanel value={value} index={3}>
            <Projects />
          </TabPanel> */}
          <TabPanel value={value} index={3}>
            <Social />
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyDetailsForm;
