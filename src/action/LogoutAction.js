import * as actionTypes from "../constants/actionTypes";

export function logoutUserSuccess() {
  return {
    type: actionTypes.LOGOUT_USER,
    userData: {}
  };
}

export function logoutUser() {
  return function(dispatch) {
    return dispatch(logoutUserSuccess());
  };
}
