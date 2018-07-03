import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../css/index.css';
import NavBarForm from './NavBarForm';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  render () {
    if (this.props.location.pathname === '/loginUser' ||
        this.props.location.pathname === '/registerUser') {
      return (
        <div className="nav-container">
          <h1 className="login-h1"> HCL Student Academy </h1>
        </div>
      );
    }

    return(
      <div className="nav-container">
        <h1>HCL Student Academy</h1>
        <nav className="nav-bar">
          <NavLink
            to="/addCourse"
            className="nav-link"
            activeClassName="nav-link-focus"
            name="addCourse" >
            Add Course
          </NavLink>
          {'   '}
          <NavLink
            to="/allCourses"
            className="nav-link"
            activeClassName="nav-link-focus"
            name="allCourses" >
            All Courses
          </NavLink>
          {'   '}
          <NavLink
            to="/recommendedCourses"
            className="nav-link"
            activeClassName="nav-link-focus"
            name="recommendedCourses" >
            Recommended Courses
          </NavLink>
          {'   '}
          <NavLink
            to="/courseTracker"
            className="nav-link"
            activeClassName="nav-link-focus"
            name="courseTracker" >
            Course Tracker
          </NavLink>
          <NavLink
            to="/logoutUser"
            className="nav-link"
            activeClassName="nav-link-focus"
            name="logout" >
            Logout
          </NavLink>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  location : PropTypes.object.isRequired
};

export default NavBar;
