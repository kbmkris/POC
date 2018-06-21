import * as actionTypes from '../constants/actionTypes';

const LoginReducer = (state = {}, action) => {
//  debugger;
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      console.log('In Reducer ' + action.userData);
      return action.userData;
    case actionTypes.REGISTER_USER:
      console.log('In Reducer ' + action.userData);
      return action.userData;
    default:
      return state;
  }
};

export default LoginReducer;
