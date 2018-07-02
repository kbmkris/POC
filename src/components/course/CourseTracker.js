import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import CourseTrackerForm from './CourseTrackerForm';
import CourseTrackerUpdateForm from './CourseTrackerUpdateForm';
import * as UserActions from '../../action/UserAction';
import { PropTypes } from 'prop-types';

class CourseTracker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: Object.assign(
        {},
        this.props.userData,
        {status: '', message: '', updateCount: 0}),
      options: [
        "Not Yet Started",
        "In Progress",
        "Completed"
      ],
      doIShowModal: false,
      modalCourseData: {},
      modalCourseIndex: 0,
      baseModalCourseData: {}
    };

    if (this.state.userData.enrolledCourses === undefined) {
      this.state.userData.enrolledCourses = [{COURSE_ID: 0}];
    }

    this.props.dispatch(UserActions.getEnrolledCourses(this.state.userData));
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClickCancel = this.handleOnClickCancel.bind(this);
    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
    this.handleOnClickUpdateStatus = this.handleOnClickUpdateStatus.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userData.updateCount !== prevProps.userData.updateCount) {
      const userData = Object.assign({}, this.props.userData);
      if (this.props.userData.status === 'success') {
        toastr.success(this.props.userData.message);
      } else if (this.props.userData.status === 'error') {
        toastr.error(this.props.userData.message);
      }
      this.setState({
        userData,
        doIShowModal: false,
        modalCourseData: {},
        modalCourseIndex: 0
      });
    }
  }

  // reset status so that if user navigates out of this component and come back
  // state will be set properly in componentDidUpdate
  componentWillUnmount() {
    const userData = Object.assign({}, this.state.userData);
    userData.myEnrolledCourses = undefined;
    this.setState({userData});
  }


  handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let modalCourseData = JSON.parse(JSON.stringify(this.state.modalCourseData));
    let userData = JSON.parse(JSON.stringify(this.state.userData));
    console.log('in on change');
    console.log(modalCourseData);
    modalCourseData[name] = value;
    console.log(name + ',' + value);
    userData.enrolledCourses[this.state.modalCourseIndex] = modalCourseData;
    console.log(this.state.userData.enrolledCourses);
    this.setState({
      modalCourseData,
      userData
      });
  }

  handleOnClickUpdate(event, id) {
    event.preventDefault();
    const modalCourseData = JSON.parse(JSON.stringify(this.state.userData.enrolledCourses[id]));
    console.log('in on click update');
    console.log(modalCourseData);
    this.setState({
      doIShowModal: true,
      modalCourseIndex: id,
      modalCourseData: modalCourseData,
      baseModalCourseData: modalCourseData
    });
  }

  handleOnClickCancel(event) {
    event.preventDefault();
    const baseModalCourseData = this.state.baseModalCourseData;
    const userData = JSON.parse(JSON.stringify(this.state.userData));
    userData.enrolledCourses[this.state.modalCourseIndex] = baseModalCourseData;
    this.setState({
      userData,
      doIShowModal: false,
      modalCourseIndex: 0,
      modalCourseData: {},
      baseModalCourseData: {}
    });
  }

  handleOnClickUpdateStatus(event) {
    event.preventDefault();
    this.props.dispatch(
      UserActions.updateCourseStatus(
        this.state.modalCourseData,
        this.state.userData
      )
    );
  }

  render() {

    if (!this.props.userData.loggedIn) {
     return <Redirect push to="/loginUser" />;
    }

    if (this.state.userData.enrolledCourses.length === 0) {
      return (
        <div className="main-div">
          <h3> No Courses are enrolled </h3>
        </div>
      );
    }

    if (this.state.userData.enrolledCourses === undefined) {
      return (
        <div className="main-div">
          <h3>Loading...</h3>
        </div>
      );
    }

    return (
      <div>
        <CourseTrackerForm
          enrolledCourses = {JSON.parse(JSON.stringify(this.state.userData.enrolledCourses))}
          handleOnClickUpdate = {this.handleOnClickUpdate} />
        <CourseTrackerUpdateForm
          doIShowModal = {this.state.doIShowModal}
          modalCourseData = {JSON.parse(JSON.stringify(this.state.modalCourseData))}
          options = {this.state.options}
          handleOnChange = {this.handleOnChange}
          handleOnClickCancel={this.handleOnClickCancel}
          handleOnClickUpdateStatus = {this.handleOnClickUpdateStatus} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userData: state.userData
  };
}

CourseTracker.propTypes = {
  userData : PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired
};

export default connect(mapStateToProps)(CourseTracker);
