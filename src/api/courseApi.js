import AjaxRequest from './ajaxRequest';

class CourseApi {

  static getAllCourses() {
    console.log("inside getAllCourses");
    let dataToSend = "";
    let url = "http://localhost:3000/course/rest/getAllCourse";
    setTimeout( () => {},2000);
    return AjaxRequest.getDataFromApi(url,dataToSend,"GET");
  }

  static getRecommendedCourses(emailId) {
    console.log("inside getRecommendedCourses");
    let dataToSend = "emailId=" + emailId;
    let url = "http://localhost:3000/course/rest/recomendedCourses";
    return AjaxRequest.getDataFromApi(url, dataToSend);
  }

  static addNewCourse(courseData) {
    console.log('In courseApi ' + courseData);
    let dataToSend = "";
    let url = "";
    let reject = false;
    let rmessage = "";
    let promises = courseData.title.map((title,idx) => {
      dataToSend = "courseName=" + courseData.courseName + "&courseTitle="
        + title.courseTitle + "&link=" + title.link + "&topic=" +
        JSON.stringify(title.topic);
      let url = "http://localhost:3000/course/rest/addNewCourse";
      return AjaxRequest.getDataFromApi(url,dataToSend);
    });
    Promise.all(promises).then((response) => {
      console.log("Inside all promises");
      console.log(response);
      if (response.status !== "success") {
        reject = true;
        rmessage = response.message;
      }
    });
    if (reject === false) {
      console.log("Inside reject as false");
      return Promise.resolve(
        {
          status:"success",
          message:"Course inserted Successfully"
        });
    } else {
      console.log("Inside reject as true");
      return Promise.resolve({status:"error",message:rmessage});
    }
  }

}

export default CourseApi;
