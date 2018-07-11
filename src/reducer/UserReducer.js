import * as actionTypes from "../constants/actionTypes";

const UserReducer = (state = {}, action) => {
//  debugger;
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return action.userData;
    case actionTypes.REGISTER_USER:
      return action.userData;
    case actionTypes.ENROLL_COURSE:
      return action.userData;
    case actionTypes.GET_ENROLLED_COURSES:
      return action.userData;
    case actionTypes.UPDATE_COURSE_STATUS:
      return action.userData;
    case actionTypes.LOGOUT_USER:
      return action.userData;
    default:
      return state;
  }
};

export default UserReducer;
