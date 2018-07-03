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
    return CourseApi.addNewCourse(courseData)
      .then((response) => {
        const courseData1 = Object.assign({},courseData);
        const resp = response.find(resp => resp.status === 'error');
        courseData1.courseCount++;
        if (resp === undefined) {
          courseData1.status = 'success';
          courseData1.message = 'Course inserted successfully';
        } else {
          courseData1.status = 'error';
          courseData1.message = resp.message;
        }
        dispatch(addCourseSuccess(courseData1));
      }).catch(error => {
        throw(error);
      });

  };
}
