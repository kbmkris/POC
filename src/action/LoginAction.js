import * as actionTypes from "../constants/actionTypes";
import UserApi from "../api/userApi";
import history from "../history";
import * as LoadingActions from "./LoadingAction";

export function loginUserSuccess(userData) {
  return {
    type: actionTypes.LOGIN_USER,
    userData
  };
}

export function loginUser(userData) {
  return function(dispatch) {
    dispatch(LoadingActions.pageLoadingStart());
    return UserApi.loginUser(
      userData.emailId,
      userData.password)
      .then(response => {
        let userData1 = Object.assign({},userData);
        userData1.status = response.status;
        userData1.message = response.message;
        if (userData1.status === "success") {
          userData1.loggedIn = true;
          userData1.message = "Login Successful";
        } else {
          userData1.loggedIn = false;
          userData1.message = "Invalid Credentials. Please check";
        }
        setTimeout( () => {
        dispatch(LoadingActions.pageLoadingComplete());
        dispatch(loginUserSuccess(userData1));
      },3000);
      }).catch(error => {
        throw(error);
      });
  };
}
