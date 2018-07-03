import * as actionTypes from '../constants/actionTypes';
import CourseApi from '../api/courseApi';
import history from '../history';

export function getAllCoursesSuccess(allCoursesData) {
  return {
    type: actionTypes.GET_ALL_COURSES,
    allCoursesData
  };
}

export function getAllCourses() {
  return function(dispatch) {
    return CourseApi.getAllCourses()
      .then((allCoursesData) => {
        console.log("courses are retrieved now");
        dispatch(getAllCoursesSuccess(allCoursesData));
      }).catch(error => {
        throw(error);
      });
  };
}

export function getRecommendedCoursesSuccess(allCoursesData) {
//  console.log("getRecommendedCoursesSuccess");
//  console.log(allCoursesData);
  return {
    type: actionTypes.GET_RECOMMENDED_COURSES,
    allCoursesData
  };
}

export function getRecommendedCourses(emailId) {
  return function(dispatch) {
    return CourseApi.getRecommendedCourses(emailId)
      .then((allCoursesData) => {
        dispatch(getRecommendedCoursesSuccess(allCoursesData));
      }).catch(error => {
        throw(error);
      });
  };
}
