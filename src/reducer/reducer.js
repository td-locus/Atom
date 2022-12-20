import { SHOW_LOADING, HIDE_LOADING, SHOW_FLASH_MESSAGE, HIDE_FLASH_MESSAGE, LOGIN, LOGOUT } from "./actionTypes";

const initialState = {
  showFlashMessage: false,
  flashMessageType: "error",
  flashMessage: "",
  showLoading: false,

  loggedIn: Boolean(localStorage.getItem("authToken")),
  user: {
    token: localStorage.getItem("authToken"),
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    defaultAvatar: localStorage.getItem("defaultAvatar"),
    title: localStorage.getItem("title"),
    avatar: localStorage.getItem("avatar"),
    role: localStorage.getItem("role"),
    googleAuth: Boolean(localStorage.getItem("googleAuthToken")),
  },
};

const reducer = (draft, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      draft.showLoading = true;
      break;
    case HIDE_LOADING:
      draft.showLoading = false;
      break;
    case SHOW_FLASH_MESSAGE:
      draft.flashMessage = action.message;
      draft.flashMessageType = action.flashMessageType;
      draft.showFlashMessage = true;
      break;
    case HIDE_FLASH_MESSAGE:
      draft.showFlashMessage = false;
      break;
    case LOGIN:
      draft.loggedIn = true;
      draft.user = action.data;
      break;
    case LOGOUT:
      draft.loggedIn = false;
      draft.user = {
        token: "",
        name: "",
        defaultAvatar: "",
        title: "",
        avatar: "",
        googleAuth: false,
        role: "",
      };
      break;
    default:
      console.log("Unknown Error");
  }
};
export { reducer, initialState };
