import * as actionTypes from '../constants/actionTypes';

const CourseReducer = (state = {}, action) => {
//  debugger;
  switch (action.type) {
    case actionTypes.ADD_COURSE:
//      console.log('In Reducer ' );
      return action.courseData;
    default:
      return state;
  }
};

export default CourseReducer;
