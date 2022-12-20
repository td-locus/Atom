import React, { useEffect, useRef, useContext, useState } from "react";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";
import { login, showFlashMessage, showErrorMessage, showLoading, hideLoading } from "../../reducer/actions";

import { useImmerReducer } from "use-immer";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Button, Divider, FormHelperText, Skeleton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FormGroup } from "reactstrap";

import { fetchGeneral, isEmailAvailable, isUsernameAvailable, postGeneral, removeAvatar, updateAvatar } from "./helper/API";

const General = () => {
  const { state } = useContext(StateContext);
  const { dispatch } = useContext(DispatchContext);

  const avatar = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const [switchButtons, setSwitchButtons] = useState(false);
  const [avatarUpload, setAvatarUpload] = useState(false);
  const reducer = (draft, action) => {
    switch (action.type) {
      case "setLoading":
        draft.loading = !draft.loading;
        break;
      case "setSkeleton":
        draft.skeleton = false;
        break;
      case "setName":
        draft.name = action.value;
        break;
      case "setBio":
        draft.bio = action.value;
        break;
      case "setTitle":
        draft.title = action.value;
        break;
      case "setDOB":
        draft.dob = action.value;
        break;
      case "setUsername":
        draft.username = action.value;
        break;
      case "setEmail":
        draft.email = action.value;
        break;
      case "setCollegeEmail":
        draft.collegeEmail = action.value;
        break;
      case "setInterests":
        draft.interests = action.value;
        break;
      case "setStacks":
        draft.stacks = action.value;
        break;
      case "setWebsite":
        draft.website = action.value;
        break;
      case "setResume":
        draft.resume = action.value;
        break;
      default:
        console.log("Error");
    }
  };
  const initialState = {
    loading: false,
    skeleton: true,
    name: "",
    bio: "",
    title: "",
    interests: "",
    username: "",
    email: "",
    collegeEmail: "",
    stacks: "",
    website: "",
    resume: "",
  };
  const [generalState, generalDispatch] = useImmerReducer(reducer, initialState);
  // fetch general data
  const fetchData = async () => {
    const { response } = await fetchGeneral();
    generalDispatch({ type: "setName", value: response.name });
    generalDispatch({ type: "setEmail", value: response.email });
    generalDispatch({ type: "setUsername", value: response?.username || "" });
    generalDispatch({ type: "setTitle", value: response?.title || "" });
    generalDispatch({ type: "setBio", value: response?.bio || "" });
    generalDispatch({ type: "setCollegeEmail", value: response?.collegeEmail || "" });
    generalDispatch({ type: "setInterests", value: response?.interests.toString() || "" });
    generalDispatch({ type: "setStacks", value: response?.stacks.toString() || "" });
    generalDispatch({ type: "setResume", value: response?.resume || "" });
    generalDispatch({ type: "setWebsite", value: response?.website || "" });
    dispatch(hideLoading());
  };

  // load profile picture
  useEffect(() => {
    const _avatar = new Image();
    _avatar.src = state.user.avatar || state.user.defaultAvatar;
    _avatar.onload = function () {
      generalDispatch({ type: "setSkeleton" });
      const avatarDiv = avatar.current;
      const _img = avatarDiv.children[0];
      _img.src = this.src;
    };
  }, [state.user]);

  // load data & add validations
  useEffect(() => {
    dispatch(showLoading());

    // add validation to title
    ValidatorForm.addValidationRule("isTitleValid", (value) => {
      if (value.length > 15) return false;
      return true;
    });
    // check if interests are less than 5
    ValidatorForm.addValidationRule("interests", (value) => {
      if (value.toString().split(",").length > 5) return false;
      return true;
    });
    // fetch general data
    fetchData();
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule("isUsernameAvailable", () => {
      return true;
    });
    ValidatorForm.addValidationRule("isUsernameValid", () => {
      if (generalState.username.length < 4 || generalState.username.length > 12) return false;
      return true;
    });
  }, [generalState.username]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isEmailAvailable", () => {
      return true;
    });
  }, [generalState.email]);

  //remove avatar
  const removeProfile = async () => {
    dispatch(showLoading());

    const { response, status } = await removeAvatar();
    dispatch(hideLoading());

    if (status === 200) {
      dispatch(showFlashMessage("success", "Profile picture removed."));
      localStorage.setItem("avatar", "");
      dispatch(login({ ...state.user, ...response }));
    } else {
      dispatch(showErrorMessage());
    }
  };

  const [image, setImage] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "atom_think_digital");
    data.append("cloud_name", "dumflmyit");
    fetch("https://api.cloudinary.com/v1_1/dumflmyit/image/upload", { method: "post", body: data })
      .then((resp) => resp.json())
      .then(async (data) => {
        await updateAvatar(data.secure_url);
        setAvatarUpload(false);
        setSwitchButtons(false);
        dispatch(login({ ...state.user, avatar: data.url }));
        localStorage.setItem("avatar", data.url);
        dispatch(showFlashMessage("success", "Profile picture updated."));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showErrorMessage());
      });
  };
  // set profile picture
  const handleChange = async (e) => {
    setSwitchButtons(true);
    // console.log(e.target, e.target.files);
    const avatarDiv = avatar.current;
    const _img = avatarDiv.children[0];
    _img.src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  // undo changes
  const cancelChange = () => {
    setSwitchButtons(false);
    setAvatarUpload(false);
    const avatarDiv = avatar.current;
    const _img = avatarDiv.children[0];
    _img.src = state.user.avatar || state.user.defaultAvatar;
    setImage("");
  };
  // upload new image
  const uploadAvatar = async () => {
    setAvatarUpload(true);
    uploadImage();
  };

  // submit all changes
  const handleSubmit = async () => {
    generalDispatch({ type: "setLoading" });
    let data = {
      ...generalState,
    };
    delete data.loading;
    delete data.skeleton;
    const usernameError = await isUsernameAvailable(generalState.username);
    const emailError = await isEmailAvailable(generalState.email);
    // console.log(emailError);
    if (usernameError) {
      generalDispatch({ type: "setLoading" });

      ValidatorForm.addValidationRule("isUsernameAvailable", () => {
        return false;
      });
      username.current.validate();
    }
    if (emailError) {
      generalDispatch({ type: "setLoading" });

      ValidatorForm.addValidationRule("isEmailAvailable", () => {
        return false;
      });
      email.current.validate();
    }
    if (!usernameError && !emailError) {
      const { status, response } = await postGeneral(data);
      generalDispatch({ type: "setLoading" });
      if (status === 200) {
        dispatch(login({ ...state.user, ...response }));
        dispatch(showFlashMessage("success", "Profile updated successfully!"));
      } else {
        dispatch(showErrorMessage());
      }
    }
  };
  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} className="mb-5">
          <p className="details-heading">Edit Profile</p>
          <Divider flexItem className="my-3" />

          <Stack direction="row" spacing={2}>
            {generalState.skeleton ? (
              <Skeleton variant="circular" width={60} height={60} />
            ) : (
              <Avatar alt={state.user.name} src={state.user.avatar || state.user.defaultAvatar} ref={avatar} sx={{ width: 60, height: 60 }} />
            )}
            <div className="update-avatar d-flex align-items-center flex-wrap">
              {!switchButtons ? (
                <React.Fragment>
                  <Button variant="outlined" className="me-2 mb-2" onClick={removeProfile} disabled={Boolean(!state.user.avatar)} startIcon={<DeleteOutlineIcon />}>
                    Remove
                  </Button>
                  <Button variant="contained" className="me-2 mb-2" component="label" startIcon={<EditIcon />}>
                    Edit
                    <input type="file" accept="image/*" hidden onChange={handleChange} />
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button variant="outlined" className="me-2" onClick={cancelChange}>
                    Cancel
                  </Button>
                  <LoadingButton loading={avatarUpload} loadingPosition="start" startIcon={<SaveIcon />} variant="contained" onClick={uploadAvatar}>
                    Save
                  </LoadingButton>
                </React.Fragment>
              )}
            </div>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator
              label="Full Name *"
              onChange={(e) => generalDispatch({ type: "setName", value: e.target.value })}
              name="name"
              fullWidth
              value={generalState.name}
              validators={["required"]}
              errorMessages={["This field is required."]}
              autoComplete="off"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} md={6} className="pe-md-0 pe-lg-2">
          <FormGroup className="mb-4">
            <TextValidator
              label="Title"
              onChange={(e) => generalDispatch({ type: "setTitle", value: e.target.value })}
              name="name"
              fullWidth
              value={generalState.title}
              validators={["isTitleValid"]}
              errorMessages={["Title should be less than 15 characters."]}
              autoComplete="off"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup className="mb-4">
            <TextValidator
              label="Username *"
              ref={username}
              onChange={(e) => generalDispatch({ type: "setUsername", value: e.target.value })}
              name="username"
              fullWidth
              value={generalState.username}
              validators={["required", "isUsernameValid", "isUsernameAvailable"]}
              errorMessages={["This field is required.", "Username must be between 4 and 12 characters.", "Username already taken."]}
              autoComplete="off"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator
              label="Bio"
              onChange={(e) => generalDispatch({ type: "setBio", value: e.target.value })}
              name="bio"
              fullWidth
              multiline
              rows={3}
              value={generalState.bio}
              autoComplete="off"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator
              label="Email *"
              ref={email}
              onChange={(e) => generalDispatch({ type: "setEmail", value: e.target.value })}
              name="email"
              fullWidth
              disabled={state.user.googleAuth}
              value={generalState.email}
              validators={["required", "isEmail", "isEmailAvailable"]}
              errorMessages={["This field is required.", "Not a valid Email.", "Email already taken."]}
              autoComplete="off"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator
              label="College Email"
              onChange={(e) => generalDispatch({ type: "setCollegeEmail", value: e.target.value })}
              name="college_email"
              fullWidth
              value={generalState.collegeEmail}
              validators={["isEmail"]}
              errorMessages={["Not a valid Email."]}
              autoComplete="off"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup className="mb-3">
            <TextValidator
              label="Interests"
              onChange={(e) => generalDispatch({ type: "setInterests", value: e.target.value })}
              name="interest"
              fullWidth
              value={generalState.interests}
              id="interests"
              autoComplete="off"
              validators={["interests"]}
              errorMessages={["Cannot be more than five."]}
            />
            <FormHelperText id="interests">Comma separated, max of five.</FormHelperText>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator
              label="Tech Stacks"
              onChange={(e) => generalDispatch({ type: "setStacks", value: e.target.value })}
              name="stacks"
              fullWidth
              value={generalState.stacks}
              id="stacks"
              autoComplete="off"
            />
            <FormHelperText id="interests">Comma separated.</FormHelperText>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator label="Website" onChange={(e) => generalDispatch({ type: "setWebsite", value: e.target.value })} name="website" fullWidth value={generalState.website} autoComplete="off" />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup className="mb-4">
            <TextValidator label="Resume" onChange={(e) => generalDispatch({ type: "setResume", value: e.target.value })} name="resume" fullWidth value={generalState.resume} autoComplete="off" />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton type="submit" loading={generalState.loading} loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
            Save changes
          </LoadingButton>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default General;
