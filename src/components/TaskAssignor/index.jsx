import React, { useState, useContext, useEffect } from "react";
import DispatchContext from "../../context/DispatchContext";
import { showFlashMessage, showLoading, hideLoading, showErrorMessage } from "../../reducer/actions";
import { useHistory, useLocation } from "react-router-dom";

import { Container } from "reactstrap";

import { Grid, TextField, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Multiselect } from "multiselect-react-dropdown";

import { FetchTask, DeleteTask, UpdateTask } from "./helper/API";
import { GetAssignees } from "../MySpace/helper/API";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(37, 150, 190)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(assignee, completed, completedAt) {
  return { name: assignee?.name, completed, completedAt };
}

const Task = () => {
  const history = useHistory();
  const location = useLocation();
  const taskId = location.search.split("=")[1];

  const { dispatch } = useContext(DispatchContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [rows, setRows] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    assignees: [],
  });
  const [original, setOriginal] = useState({});
  const [assignees, setAssignees] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    dispatch(showLoading());
    const fetchTask = async () => {
      const task_ = await FetchTask(taskId);
      const rows_ = [];
      for (let i = 0; i < task_.assignees.length; i++) {
        rows_.push(createData(task_.assignees[i].assignee, task_.assignees[i].completed, task_.assignees[i].completed_at));
      }
      setRows(rows_);
      setTask(task_);
      setOriginal(task_);

      dispatch(hideLoading());
    };
    fetchTask();
  }, []);

  useEffect(() => {
    const getAssignees = async () => {
      const response = await GetAssignees();
      setAssignees(response);
      const selectedMembers = [];
      for (let i = 0; i < task.assignees.length; i++) {
        selectedMembers.push(task.assignees[i].assignee);
      }
      setSelectedValues(selectedMembers);
    };
    if (task.title) getAssignees();
  }, [task]);

  const handleDelete = async () => {
    const status = await DeleteTask(taskId);
    if (status === 200) {
      history.push(`/my-space`);
      dispatch(showFlashMessage("success", "Task deleted successfully!"));
    } else {
      dispatch(showErrorMessage());
    }
  };

  const handleSubmit = async () => {
    dispatch(showLoading());

    const members = document.querySelectorAll("span.chip");
    const assigneesArr = [];
    members.forEach((member) => {
      assigneesArr.push(member.innerText);
    });
    for (let i = 0; i < assigneesArr.length; i++) {
      for (let j = 0; j < assignees.length; j++) {
        if (assigneesArr[i] === assignees[j].name) {
          assigneesArr[i] = assignees[j]._id;
          continue;
        }
      }
    }

    const task_ = { ...task };
    task_.assignees = assigneesArr;
    task_._id = taskId;

    const data = await UpdateTask(task_);

    if (data) {
      dispatch(hideLoading());
      dispatch(showFlashMessage("success", "Task updated successfully!"));
      const rows_ = [];
      for (let i = 0; i < data.assignees.length; i++) {
        rows_.push(createData(data.assignees[i].assignee, data.assignees[i].completed, data.assignees[i].completed_at));
      }
      setRows(rows_);
    } else {
      dispatch(showErrorMessage());
    }
  };
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
      position: "relative",
      top: "-5px",
    },
  };
  return (
    <Container fluid className="auth-layout py-3 editTask">
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">This task be deleted immediately. You can't undo this action.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <div className="heading d-flex justify-content-between">
        <h3>Edit Task</h3>
      </div>
      <Grid container spacing={2} xs={12} md={10} sx={{ mx: "auto", mt: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            required
            id="outlined-required"
            label="Title"
            fullWidth
            value={task.title}
            onChange={(e) =>
              setTask({
                ...task,
                title: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} fullWidth />}
              label="Due date"
              value={task.dueDate}
              onChange={(newValue) => {
                setTask({
                  ...task,
                  dueDate: newValue,
                });
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={task.description}
            onChange={(e) =>
              setTask({
                ...task,
                description: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          {<Multiselect options={assignees} selectedValues={selectedValues} displayValue="name" placeholder="Assignees" hidePlaceholder={true} style={style} />}
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="error" className="me-2 mt-2" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
            Delete Task
          </Button>
          <Button variant="outlined" className="me-2 mt-2" onClick={() => setTask(original)} startIcon={<RotateLeftIcon />}>
            Undo Changes
          </Button>
          <Button variant="contained" className="me-2 mt-2" onClick={handleSubmit} startIcon={<SaveIcon />}>
            Save Changes
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} xs={12} md={10} sx={{ mx: "auto", mt: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Completed at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.completed ? "Completed" : "Pending"}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.completed
                      ? new Date(row.completedAt).toLocaleTimeString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                        })
                      : "-"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};

export default Task;
