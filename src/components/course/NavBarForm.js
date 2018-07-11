import React from "react";
import { Link } from "react-router-dom";
import styles from "../../css/index.css";

const NavBarForm = () => {
  return(
    <div className="nav-container-login">
      <h1>HCL Student Academy</h1>
      <nav className="nav-bar">
        <Link
          to="/addCourse"
          className="nav-link"
          name="addCourse" >
          Add Course
        </Link>
        {"   "}
        <Link
          to="/allCourses"
          className="nav-link"
          name="allCourses" >
          All Courses
        </Link>
        {"   "}
        <Link
          to="/recommendedCourses"
          className="nav-link"
          name="recommendedCourses" >
          Recommended Courses
        </Link>
        {"   "}
        <Link
          to="/courseTracker"
          className="nav-link"
          name="courseTracker" >
          Course Tracker
        </Link>
        <Link
          to="/logoutUser"
          className="nav-link"
          name="logout" >
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default NavBarForm;
