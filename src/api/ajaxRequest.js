class AjaxRequest {

  static getDataFromApi(url, dataToSend, type="POST") {
//    console.log(type + " - " + url + dataToSend);
    return new Promise( (resolve,reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
//       console.log(this.readyState +  "," + this.status + "," + this.responseText);
        if (this.readyState === 4 && this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else if (this.readyState === 4 && this.status === 500) {
          resolve(JSON.parse(this.responseText));
        }
      };
    //    console.log ("Going to call " + url + dataToSend);
    if (type === "POST") {
      xhttp.open(type, url, true);
      xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhttp.send(dataToSend);
    } else if (type === "GET") {
      xhttp.open(type, url , true);
      xhttp.send();
    }
    });
  }
}

export default AjaxRequest;
