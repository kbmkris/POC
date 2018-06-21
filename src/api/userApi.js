import React from 'react';


class UserApi {

  static getDataFromApi(url, dataToSend) {
    return new Promise( (resolve,reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
       console.log(this.readyState +  ',' + this.status + ',' + this.responseText);
        if (this.readyState === 4 && this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else if (this.readyState === 4 && this.status === 500) {
          resolve(JSON.parse(this.responseText));
        }
      };
//    console.log ('Going to call ' + url + dataToSend);
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhttp.send(dataToSend);
    });
  }

  static loginUser(emailId, password) {
    let dataToSend = 'userName=' + emailId + '&password=' + password;
    let url = "http://localhost:3000/users/rest/login";
  //  console.log(url + dataToSend);
    return UserApi.getDataFromApi(url, dataToSend);
  }

  static registerUser(userData) {
    let dataToSend = "name=" + userData.name + "&sapId=" + userData.sapId;
    dataToSend = dataToSend + "&emailId=" + userData.emailId;
    dataToSend = dataToSend + "&primarySkill=" + userData.primarySkill;
    dataToSend = dataToSend + "&band=" + userData.band;
    dataToSend = dataToSend + "&password=" + userData.password;
    let url = "http://localhost:3000/users/rest/registerUser";
    console.log(dataToSend);
    return UserApi.getDataFromApi(url, dataToSend);
  }

}

export default UserApi;
