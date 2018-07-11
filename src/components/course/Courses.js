import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CoursesForm from "./CoursesForm";
import * as AllCoursesAction from "../../action/AllCoursesAction";
import * as UserAction from "../../action/UserAction";
import { PropTypes } from "prop-types";
import {toastr} from "react-redux-toastr";

class Courses extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      userData: Object.assign(
        {},
        props.userData,
        {
          status: "",
          message: "",
          enrollCount: 0
        }
      ),
      btnClassName: [],
      panelClassName: [],
      statusData: {
        isLoading: true
      },
      allCoursesData: [
        {
          courseName: "",
          courseId: "",
          title: [
            {
              courseTitleId: 0,
              courseTitle: "",
              link: "",
              courseId: "",
              topic: [
                {
                  topicId: 0,
                  topicName: ""
                }
              ]
            }
          ]
        }
      ]
    };

    this.handleOnClickToggle = this.handleOnClickToggle.bind(this);
    this.handleOnClickEnroll = this.handleOnClickEnroll.bind(this);
  }

  componentDidMount() {
//    console.log("Courses - ComponentDidMount - User email id is " + this.props.userData.emailId);
    if (this.props.recommendedCourses === true) {
      this.props.dispatch(AllCoursesAction.getRecommendedCourses(this.props.userData.emailId));
    } else {
      this.props.dispatch(AllCoursesAction.getAllCourses());
    }
  }

  componentDidUpdate(prevProps) {
//    console.log("inside courses componentDidUpdate");
//    console.log(this.props);
//    console.log(prevProps);
//    console.log(this.state.userData);
    if (this.props.allCoursesData !== prevProps.allCoursesData) {
      const { allCoursesData } = this.props;
      let btnClassName = [];
      let panelClassName = [];
      let defaultBtnClassName = "collapsible";
      let defaultPanelClassName = "panelInactive";
      let noOfCourses = 0 ;
      while (noOfCourses < allCoursesData.length) {
        btnClassName.push(defaultBtnClassName);
        panelClassName.push(defaultPanelClassName);
        noOfCourses++;
      }
      this.setState({allCoursesData, btnClassName, panelClassName});
    }
    if (this.props.userData.enrollCount !== prevProps.userData.enrollCount ) {
      const userData = Object.assign({}, this.state.userData);
      userData.status = this.props.userData.status;
      userData.message = this.props.userData.message;
      userData.enrollCount = this.props.userData.enrollCount;
      if (userData.status === "success") {
        toastr.success(userData.message);
      } else  {
        toastr.error(userData.message);
      }
      this.setState({userData});
    }
  }

  handleOnClickToggle(event, idx) {
//    console.log("handleOnClickToggle with idx " + idx );
    let btnClassName = [...this.state.btnClassName];
    if (btnClassName[idx] === "collapsible") {
      btnClassName[idx] = "collapsible active";
    } else {
      btnClassName[idx] = "collapsible";
    }
    let panelClassName = [...this.state.panelClassName];
    if (panelClassName[idx] === "panelActive") {
      panelClassName[idx] = "panelInactive";
    } else {
      panelClassName[idx] = "panelActive";
    }
    this.setState({btnClassName, panelClassName});
  }

  handleOnClickEnroll (event, courseId, courseName) {
    event.preventDefault();
    const userData = Object.assign({},this.state.userData);
    userData.course = {};
    userData.course.courseId = courseId;
    userData.course.courseName = courseName;
//    console.log("in enroll");
//    console.log(userData);
    this.props.dispatch(UserAction.enroleCourse(userData));
//    console.log("clicked for email id " + this.props.userData.emailId +
//      " courseId " + courseId);
  }


  render() {

//    console.log ("inside courses render");
    if (this.props.userData.loggedIn !== true) {
      return <Redirect push to="/loginUser" />;
    }
//    console.log(this.state.btnClassName);
    if (this.props.isLoading) {
      return (
        <div>
          <h3>Retrieving all Courses. Please Wait...</h3>
        </div>
      );
    }

    return (
      <CoursesForm
        allCoursesData = {this.state.allCoursesData}
        btnClassName={this.state.btnClassName}
        panelClassName={this.state.panelClassName}
        handleOnClickToggle = {this.handleOnClickToggle}
        handleOnClickEnroll = {this.handleOnClickEnroll}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    allCoursesData: state.allCoursesData,
    userData: state.userData,
    isLoading: state.isLoading
  };
}

Courses.propTypes = {
  userData : PropTypes.object.isRequired,
  recommendedCourses: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  allCoursesData: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Courses);
