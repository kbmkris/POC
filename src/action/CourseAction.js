import * as actionTypes from '../constants/actionTypes';
import CourseApi from '../api/courseApi';
import history from '../history';

export function addCourseSuccess(courseData) {
  console.log("sending action");
  return {
    type: actionTypes.ADD_COURSE,
    courseData
  };
}

export function addCourse (courseData) {
  return function(dispatch) {
    console.log("going to courseapi");
    return CourseApi.addNewCourse(courseData)
      .then((response) => {
        const courseData1 = Object.assign({},courseData);
        courseData1.status = response.status;
        courseData1.message = response.message;
        console.log("Going to dispatch addCourseSuccess");
        dispatch(addCourseSuccess(courseData1));
//        if (courseData1.status === 'success') {
//          setTimeout(() => {history.push('/allCourses');},2000);
//        }
      }).catch(error => {
        throw(error);
      });
  };
}
