import * as actionTypes from "../constants/actionTypes";
import CourseApi from "../api/courseApi";
import history from "../history";
import * as LoadingActions from "./LoadingAction";

export function getAllCoursesSuccess(allCoursesData) {
  return {
    type: actionTypes.GET_ALL_COURSES,
    allCoursesData
  };
}

export function getAllCourses() {
  return function(dispatch) {
    dispatch(LoadingActions.pageLoadingStart());
    return CourseApi.getAllCourses()
      .then((allCoursesData) => {
//        console.log("courses are retrieved now");
        dispatch(LoadingActions.pageLoadingComplete());
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
    dispatch(LoadingActions.pageLoadingStart());
    return CourseApi.getRecommendedCourses(emailId)
      .then((allCoursesData) => {
        dispatch(LoadingActions.pageLoadingComplete());
        dispatch(getRecommendedCoursesSuccess(allCoursesData));
      }).catch(error => {
        throw(error);
      });
  };
}
