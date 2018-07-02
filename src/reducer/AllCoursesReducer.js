import * as actionTypes from '../constants/actionTypes';

const AllCoursesReducer = (state = [], action) => {
//  debugger;
  switch (action.type) {
    case actionTypes.GET_ALL_COURSES:
      console.log("In get all course reducer ");
      return action.allCoursesData;
    case actionTypes.GET_RECOMMENDED_COURSES:
      console.log("In get recommended coures reducer ");
      return action.allCoursesData;
    default:
      return state;
  }
};

export default AllCoursesReducer;
