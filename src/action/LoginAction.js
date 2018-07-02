import * as actionTypes from '../constants/actionTypes';
import UserApi from '../api/userApi';
import history from '../history';

export function loginUserSuccess(userData) {
  console.log(userData);
  return {
    type: actionTypes.LOGIN_USER,
    userData
  };
}

export function loginUser(userData) {
  return function(dispatch) {
    return UserApi.loginUser(
      userData.emailId,
      userData.password).then(response => {
        let userData1 = Object.assign({},userData);
        userData1.status = response.status;
        userData1.message = response.message;
        if (userData1.status === 'success') {
          userData1.loggedIn = true;
          userData1.message = 'Login Successful';
        } else {
          userData1.loggedIn = false;
          userData1.message = 'Invalid Credentials. Please check';
        }
        console.log("value of userData1 " + userData1.loggedIn);
        dispatch(loginUserSuccess(userData1));
//        if (userData1.loggedIn) {
//          console.log('User is logged in so redirecting to allCourses Page');
//          setTimeout(() => {history.push('/allCourses');},0);
//        }
      }).catch(error => {
        throw(error);
      });
  };
}
