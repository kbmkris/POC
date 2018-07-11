import AjaxRequest from "./ajaxRequest";

class CourseApi {

  static getAllCourses() {
//    console.log("inside getAllCourses");
    let dataToSend = "";
    let url = "http://localhost:3000/course/rest/getAllCourse";
    setTimeout( () => {},2000);
    return AjaxRequest.getDataFromApi(url,dataToSend,"GET");
  }

  static getRecommendedCourses(emailId) {
//    console.log("inside getRecommendedCourses");
    let dataToSend = "emailId=" + emailId;
    let url = "http://localhost:3000/course/rest/recomendedCourses";
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

  static addNewCourse(courseData) {
//    console.log("In courseApi " + courseData);
    let dataToSend = "";
    let url = "";
    let rmessage = "";
    let promises = [];
    return Promise.all(courseData.title.map((title,idx) => {
      dataToSend = "courseName=" + courseData.courseName + "&courseTitle="
        + title.courseTitle + "&link=" + title.link + "&topic=" +
        JSON.stringify(title.topic);
      let url = "http://localhost:3000/course/rest/addNewCourse";
      return AjaxRequest.getDataFromApi(url,dataToSend);
    }));
  }
}

export default CourseApi;
