import * as actionTypes from '../constants/actionTypes';
import UserApi from '../api/userApi';
import history from '../history';

export function registerUserSuccess(userData) {
  return {
    type: actionTypes.REGISTER_USER,
    userData
  };
}

export function registerUser (userData) {
  return function(dispatch) {
    return UserApi.registerUser(userData)
      .then((response) => {
        const userData1 = Object.assign({},userData);
        userData1.status = response.status;
        userData1.message = response.message;
        if (response.status === 'success') {
            userData1.message = userData1.message + ' Redirecting to Login page...';
        }
        dispatch(registerUserSuccess(userData1));
        if (response.status === 'success') {
          setTimeout( () => {history.push('/loginUser');},2000);
        }
      }).catch(error => {
        throw(error);
      });
  };
}
