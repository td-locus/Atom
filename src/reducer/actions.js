import * as actionTypes from "./actionTypes";

export const showFlashMessage = (flashMessageType, message) => {
  return {
    type: actionTypes.SHOW_FLASH_MESSAGE,
    flashMessageType,
    message,
  };
};
export const showErrorMessage = () => {
  return {
    type: actionTypes.SHOW_FLASH_MESSAGE,
    flashMessageType: "error",
    message: "An error occurred! Please try again.",
  };
};
export const hideFlashMessage = () => {
  return {
    type: actionTypes.HIDE_FLASH_MESSAGE,
  };
};
export const showLoading = () => {
  return {
    type: actionTypes.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: actionTypes.HIDE_LOADING,
  };
};

export const login = (data) => {
  return {
    type: actionTypes.LOGIN,
    data,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
