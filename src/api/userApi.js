import AjaxRequest from './ajaxRequest';

class UserApi {

  static loginUser(emailId, password) {
    let dataToSend = 'userName=' + emailId + '&password=' + password;
    let url = 'http://localhost:3000/users/rest/login';
  //  console.log(url + dataToSend);
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

  static registerUser(userData) {
    let dataToSend = 'name=' + userData.name + '&sapId=' + userData.sapId;
    dataToSend = dataToSend + '&emailId=' + userData.emailId;
    dataToSend = dataToSend + '&primarySkill=' + userData.primarySkill;
    dataToSend = dataToSend + '&band=' + userData.band;
    dataToSend = dataToSend + '&password=' + userData.password;
    let url = 'http://localhost:3000/users/rest/registerUser';
//    console.log(dataToSend);
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

  /*
    Bala - need to check how to get the array index
  */
  static enroleUser(userData) {
    let dataToSend = 'courseId=' + userData.course.courseId + '&courseName=';
    dataToSend = dataToSend + userData.course.courseName + '&emailId=';
    dataToSend = dataToSend + userData.emailId;
    let url = 'http://localhost:3000/course/rest/enroleUser';
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

  static getEnrolledCourses(userData) {
//    console.log('inside api');
    let dataToSend = 'emailId=' + userData.emailId;
    let url = 'http://localhost:3000/course/rest/myEnrolledCourses';
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

  static updateCourseStatus(enrolledCourse) {
//    console.log("inside update courses api");
    let dataToSend = 'comments=' + enrolledCourse.COMMENTS + "&status=";
    dataToSend = dataToSend + enrolledCourse.STATUS + "&teachOthers=";
    dataToSend = dataToSend + enrolledCourse.TEACHOTHERS + "&courseId=";
    dataToSend = dataToSend + enrolledCourse.COURSE_ID + "&emailId=";
    dataToSend = dataToSend + enrolledCourse.EMAILID;
    let url = 'http://localhost:3000/course/rest/updateStatus';
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

}

export default UserApi;
