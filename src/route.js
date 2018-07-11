import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import LoginUser  from "./components/login/LoginUser";
import RegisterUser from "./components/login/RegisterUser";
import AddCourse from "./components/course/AddCourse";
import Courses from "./components/course/Courses";
import CourseTracker from "./components/course/CourseTracker";
import LogoutUser from "./components/login/LogoutUser";
import NavBar from "./components/course/NavBar";

class AppRoute extends React.Component {

  render() {
    return(
  <Router history={history}>
    <div>
      <Route component={NavBar} />
      <Route exact path="/" render={() => <Redirect to="/loginUser" />}/>
      <Route exact path="/loginUser" component={LoginUser} />
      <Route exact path="/registerUser" component={RegisterUser} />
      <Route exact path="/addcourse" component={AddCourse} />
      <Route exact path="/allCourses" render={(props) =>
        <Courses {...props} recommendedCourses={false} />} />
      <Route exact path="/recommendedCourses" render={(props) =>
        <Courses {...props} recommendedCourses={true} />} />
      <Route exact path="/courseTracker" component={CourseTracker} />
      <Route exact path="/logoutUser" component={LogoutUser} />
    </div>
  </Router>
);
}
}

function mapStateToProps(state, action) {
  return {
    userData: state.userData
  };
}

export default connect(mapStateToProps)(AppRoute);
