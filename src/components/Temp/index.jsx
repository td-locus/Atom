import React, { useState, useContext } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading, showFlashMessage } from "../../reducer/actions";

import { useHistory } from "react-router-dom";
import { useImmer } from "use-immer";
import Confirmation from "./Confirmation";

import { Container, Row } from "reactstrap";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WarningIcon from "@mui/icons-material/Warning";


import { ConfirmOrder } from "./helper/API";

const GoodiesForm = () => {
  const history = useHistory();
  const { dispatch } = useContext(DispatchContext);

  const [open, setOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [data, setData] = useImmer({
    name: "",
    email: "",
    phone: "",
    alternate: "",
    address: {
      house: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
    },
  });

  const handleSubmit = async () => {
    const details = { ...data };
    details.type = type;
    details.badge = badge;
    dispatch(showLoading());
    const status = await ConfirmOrder(details);

    dispatch(hideLoading());
    if (status === 201) {
      dispatch(showFlashMessage("success", "Order has been confirmed!"));
      history.push("/my-space");
    }
  };

  const [type, setType] = useState("college");
  const [badge, setBadge] = useState("");

  const steps = [
    {
      label: "Your Details",
      components: (
        <Grid container spacing={3} sx={{ mt: 0.1 }}>
          <Grid item md={8} xs={12}>
            <TextField
              id="outlined-basic"
              label="Name"
              required
              variant="outlined"
              fullWidth
              value={data.name}
              onChange={(e) =>
                setData((draft) => {
                  draft.name = e.target.value;
                })
              }
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              id="outlined-basic"
              label="Email"
              required
              variant="outlined"
              fullWidth
              value={data.email}
              onChange={(e) =>
                setData((draft) => {
                  draft.email = e.target.value;
                })
              }
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              id="outlined-basic"
              label="Phone No."
              required
              variant="outlined"
              fullWidth
              value={data.phone}
              onChange={(e) =>
                setData((draft) => {
                  draft.phone = e.target.value;
                })
              }
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              id="outlined-basic"
              label="Alt Phone No."
              required
              variant="outlined"
              fullWidth
              value={data.alternate}
              onChange={(e) =>
                setData((draft) => {
                  draft.alternate = e.target.value;
                })
              }
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Address details",
      components: (
        <Grid container spacing={3} xs={12} md={8} sx={{ mt: 0.1 }}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Address Type</FormLabel>
              <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={type} onChange={(e) => setType(e.target.value)}>
                <FormControlLabel value="college" control={<Radio />} label="College" />
                <FormControlLabel value="home" control={<Radio />} label="Home" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {type === "home" && (
            <>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Flat, House no., Building, Company, Apartment"
                  required
                  variant="outlined"
                  fullWidth
                  value={data.address.house}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.address.house = e.target.value;
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Landmark"
                  variant="outlined"
                  fullWidth
                  value={data.address.landmark}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.address.landmark = e.target.value;
                    })
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Town/City"
                  required
                  variant="outlined"
                  fullWidth
                  value={data.address.city}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.address.city = e.target.value;
                    })
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Pincode"
                  required
                  variant="outlined"
                  fullWidth
                  value={data.address.pincode}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.address.pincode = e.target.value;
                    })
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="State"
                  required
                  variant="outlined"
                  fullWidth
                  value={data.address.state}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.address.state = e.target.value;
                    })
                  }
                />
              </Grid>
            </>
          )}
        </Grid>
      ),
    },
    {
      label: "Confirmation",
      components: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you have the Think Digital Badge?</FormLabel>
              <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={badge} onChange={(e) => setBadge(e.target.value)}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <p>Before placing the order please recheck the details that you've filled. Once filled you cannot undo the changes. Incase of any queries get in touch with the team.</p>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Container fluid className="auth-layout py-3">
      <Confirmation open={open} setOpen={setOpen} handleSubmit={handleSubmit} />
      <div className="heading d-flex justify-content-between">
        <h3>Claim Goodies </h3>
      </div>
      <div className="info-social">
          <WarningIcon />
          If you have already received the Journal, skip filling the form again!
        </div>
      <Row className="pb-5 pt-2 justify-content-center  m-auto">
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>
                  <span className="font-weight-bold">{step.label}</span>
                </StepLabel>
                <StepContent>
                  <div>{step.components}</div>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index === steps.length - 1 ? (
                        <Button variant="contained" onClick={() => setOpen(true)} sx={{ mt: 1, mr: 1 }}>
                          Proceed
                        </Button>
                      ) : (
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                          Next
                        </Button>
                      )}
                      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Row>
    </Container>
  );
};
export default GoodiesForm;
