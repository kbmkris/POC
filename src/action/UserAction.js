import * as actionTypes from "../constants/actionTypes";
import UserApi from "../api/userApi";
import history from "../history";

export function enroleCourseSuccess(userData){
  return {
    type: actionTypes.ENROLL_COURSE,
    userData
  };
}

export function enroleCourse(userData) {
  return function(dispatch) {
    return UserApi.enroleUser(userData)
      .then((response) => {
//        console.log("In response");
        let userData1 = Object.assign({}, userData);
//        console.log(userData1);
        userData1.status = response.status;
        userData1.message = response.message;
        userData1.enrollCount++;
//        console.log(userData1);
        dispatch(enroleCourseSuccess(userData1));
      }).catch(error => {
        throw(error);
      });
  };
}

export function getEnrolledCoursesSuccess(userData) {
//  console.log("getEnrolledCoursesSuccess output ");
//  console.log(userData);
  return {
    type: actionTypes.GET_ENROLLED_COURSES,
    userData
  };
}

export function getEnrolledCourses(userData) {
  return function (dispatch) {
//    console.log("Inside getEnrolledCourses");
    return UserApi.getEnrolledCourses(userData)
      .then((response) => {
        let userData1 = Object.assign({},userData);
        userData1.enrolledCourses = response;
        userData1.enrolledCourses = userData1.enrolledCourses.map((enrolledCourse) => {
          if (enrolledCourse.TEACHOTHERS === null ||
              enrolledCourse.TEACHOTHERS === "No") {
            enrolledCourse.TEACHOTHERS = false;
          } else if (enrolledCourse.TEACHOTHERS === "Yes") {
            enrolledCourse.TEACHOTHERS = true;
          }
          if (enrolledCourse.COMMENTS === null) {
            enrolledCourse.COMMENTS = "";
          }
          return enrolledCourse;
        });
        dispatch(getEnrolledCoursesSuccess(userData1));
      }).catch(error => {
        throw(error);
      });
  };
}

export function updateCourseStatusSuccess(userData) {
  return {
    type: actionTypes.UPDATE_COURSE_STATUS,
    userData
  };
}

export function updateCourseStatus(enrolledCourse, userData) {
  return function (dispatch) {
//    console.log("Inside updateCourseStatus function");
    enrolledCourse.TEACHOTHERS = enrolledCourse.TEACHOTHERS === true ? "Yes" : "No";
    return UserApi.updateCourseStatus (enrolledCourse)
      .then((response) => {
//        console.log("Inside response");
//        console.log(userData);
        const userData1 = Object.assign({},userData);
        userData1.status = response.status;
        userData1.message = response.message;
        userData1.updateCount++;
//        console.log(userData1);
        dispatch(updateCourseStatusSuccess(userData1));
      }).catch(error => {
        throw(error);
    });
  };
}
