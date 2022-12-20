import React, { useState, useContext, useEffect, useRef } from "react";
import "../../css/MySpace/MySpace.css";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage } from "../../reducer/actions";

import { useImmer } from "use-immer";

import SimpleBar from "simplebar-react";
import { Card, CardBody } from "reactstrap";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { Multiselect } from "multiselect-react-dropdown";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { GetAssignees, CreateTask_ } from "./helper/API";

const CreateTask = ({ getTasksAssignor }) => {
  const { dispatch } = useContext(DispatchContext);
  const multiSelect = useRef(null);
  const [data, setData] = useImmer({
    title: "",
    description: "",
    dueDate: new Date(),
    assignees: [],
  });
  const [assignees, setAssignees] = useState([]);
  useEffect(() => {
    const getAssignees = async () => {
      const response = await GetAssignees();
      setAssignees(response);
    };
    getAssignees();
  }, []);
  const resetForm = () => {
    multiSelect.current.resetSelectedValues();
    setData((draft) => {
      draft.title = "";
      draft.description = "";
      draft.dueDate = new Date();
    });
  };
  const [loading, setLoading] = useState(false);
  const style = {
    chips: {
      background: "#2596be",
    },
    searchBox: {
      borderRadius: "4px",
      borderColor: "rgba(0,0,0,0.3)",
      padding: "10px 10px 9px 15px",
    },
    multiselectContainer: {
      color: "#2596be",
    },
  };
  const handleSubmit = async () => {
    setLoading(true);
    const members = document.querySelectorAll("span.chip");
    const assigneesArr = [];
    members.forEach((member) => {
      assigneesArr.push(member.innerText);
    });
    for (let i = 0; i < assigneesArr.length; i++) {
      for (let j = 0; j < assignees.length; j++) {
        if (assigneesArr[i] === assignees[j].username) {
          assigneesArr[i] = assignees[j]._id;
          continue;
        }
      }
    }
    const task = { ...data };
    task.assignees = assigneesArr;

    const status = await CreateTask_(task);
    setLoading(false);

    if (status === 201) {
      dispatch(showFlashMessage("success", "Task created successfully!"));
      getTasksAssignor();
      resetForm();
    } else {
      dispatch(showFlashMessage("error", "An error occurred! Please try again."));
    }
  };
  return (
    <div className="create-event pt-2">
      <Card style={{ position: "relative" }} className="p-1 pt-0">
        <CardBody>
          <SimpleBar style={{ maxHeight: "420px", padding: 10 }}>
            <h3 className="my-space-card-title">Create New Task</h3>
            <ValidatorForm className="myspace-form" onSubmit={handleSubmit}>
              <div className="form-item mb-2">
                <TextValidator
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={data.title}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.title = e.target.value;
                    })
                  }
                  validators={["required"]}
                  errorMessages={["This field is required."]}
                />
              </div>
              <div className="form-item pb-2">
                <Multiselect ref={multiSelect} options={assignees} selectedValues={[]} displayValue="username" placeholder="Assignees" hidePlaceholder={true} style={style} />
              </div>
              <div className="form-item my-2">
                <TextValidator
                  validators={["required"]}
                  errorMessages={["This field is required."]}
                  id="outlined-multiline-static"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={data.description}
                  onChange={(e) =>
                    setData((draft) => {
                      draft.description = e.target.value;
                    })
                  }
                />
              </div>
              <div className="form-item py-2">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} fullWidth />}
                    label="Due date"
                    value={data.dueDate}
                    onChange={(newValue) => {
                      setData((draft) => {
                        draft.dueDate = newValue;
                      });
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-item form-buttons">
                <LoadingButton loadingPosition="start" startIcon={<RotateLeftIcon />} variant="contained" onClick={resetForm} className="reset-form">
                  Reset Form
                </LoadingButton>
                <LoadingButton type="submit" loading={loading} loadingPosition="start" startIcon={<SendIcon />} variant="outlined">
                  Create task
                </LoadingButton>
              </div>
            </ValidatorForm>
          </SimpleBar>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateTask;
