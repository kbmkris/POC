import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import {toastr} from "react-redux-toastr";
import styles from "../../css/index.css";
import AddCourseForm from "./AddCourseForm";
import * as AddCourseActions from "../../action/AddCourseAction";

export class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courseData: Object.assign(
        {},
        {
          courseCount: 0
         },
        this.props.courseData,
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
          ],
          status: "",
          message: "",
          isCourseSaved: false,
        }),
      topicCount: 0,
      titleCount: 0
    };
    console.log(this.state.courseData);
    console.log(this.props.courseData);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnTitleChange = this.handleOnTitleChange.bind(this);
    this.handleOnTopicChange = this.handleOnTopicChange.bind(this);
    this.handleOnClickAddTitle = this.handleOnClickAddTitle.bind(this);
    this.handleOnClickRemoveTitle = this.handleOnClickRemoveTitle.bind(this);
    this.handleOnClickAddTopic = this.handleOnClickAddTopic.bind(this);
    this.handleOnClickRemoveTopic = this.handleOnClickRemoveTopic.bind(this);
    this.handleOnClickSubmitCourse = this.handleOnClickSubmitCourse.bind(this);
  //  this.validateData = this.validateData.bind(this);
  }

  /*
    Note componentDidUpdate should include a check for current props vs previous
    props to avoid infinity render.
  */
  componentDidUpdate(prevProps) {
//    console.log(this.props);
//    console.log(prevProps);
//    console.log(this.state);
    if (this.props.courseData.courseCount !== prevProps.courseData.courseCount) {
      const courseData = Object.assign({},this.props.courseData);
//      console.log("Updated status");
      toastr.success(this.props.courseData.message);
//      console.log(courseData);
      this.setState({courseData});
    }
  }

  handleOnChange(event) {
    const courseData = Object.assign({},this.state.courseData);
    const {name, value} = event.target;
    courseData[name] = value;
    this.setState({courseData});
  }

  handleOnTitleChange(tidx,event) {
    event.preventDefault();
    const courseData = Object.assign({},this.state.courseData);
    const {name, value} = event.target;
    courseData.title.map((title,index) => {
      if (index === tidx) {
        title[name] = value;
      }
    });
//    console.log(courseData);
    this.setState({courseData});
  }

  handleOnTopicChange(tidx, ttidx, event) {
    const courseData = Object.assign({},this.state.courseData);
    const {name, value} = event.target;
    courseData.title.map((title,idx) => {
      if (idx === tidx) {
        title.topic.map((topic,idx) => {
          if (idx === ttidx) {
            topic[name] = value;
          }
        });
      }
    });
    this.setState({courseData});
  }

  handleOnClickAddTitle(tidx, event) {
//    console.log("Inside handleOnClickAddTitle - " + tidx);
    const courseData = Object.assign({},this.state.courseData);
    courseData.status = "success";
    courseData.message = "Title is added";
    const titleCount = this.state.titleCount;
    const title = {
      courseTitleId: titleCount,
      courseTitle: "",
      link: "",
      courseId: "",
      topic: [
        {
          topicId: 0,
          topicName: ""
        }
      ]
    };
//    console.log(courseData.title.length);
    if ( tidx === (courseData.title.length - 1)) {
//      console.log("if passed");
      courseData.title = [
        ...courseData.title.slice(0,tidx+1),
        title
      ];
    } else {
//      console.log("third if ");
      courseData.title = [
        ...courseData.title.slice(0,tidx+1),
        title,
        ...courseData.title.slice(tidx+1)
      ];
    }
//    console.log(courseData);

    this.setState({
      courseData,
      titleCount
    });
  }

  handleOnClickAddTopic(tidx, ttidx, event) {
    const courseData = JSON.parse(JSON.stringify(this.state.courseData));
    courseData.status = "success";
    courseData.message = "Topic is added";
    const topicCount = this.state.topicCount;
    const topic = {
      topicId: topicCount,
      topicName: ""
    };
    if (ttidx === courseData.title[tidx].topic.length) {
      courseData.title[tidx].topic = [
        ...courseData.title[tidx].topic.slice(0,ttidx+1),
        topic
      ];
    } else {
      courseData.title[tidx].topic = [
        ...courseData.title[tidx].topic.slice(0,ttidx+1),
        topic,
        ...courseData.title[tidx].topic.slice(ttidx + 1),
      ];
    }
    this.setState({
      courseData,
      topicCount
    });
  }

  handleOnClickRemoveTitle(tidx, event) {
    const courseData = Object.assign({},this.state.courseData);
    courseData.status = "success";
    courseData.message = "Title is removed";
    if (tidx ===0 && tidx === (courseData.title.length - 1)) {
      // always retain atleast one title
      courseData.status = "error";
      courseData.message = "You have to keep atleast one title";
      toastr.error("You have to keep atleast one title");
    } else if ( tidx === 0) {
      courseData.title = [
        ...courseData.title.slice(tidx+1)
      ];
    } else if (tidx === courseData.title.length ){
      courseData.title = [
        ...courseData.title.slice(0,tidx)
      ];
    } else {
      courseData.title = [
        ...courseData.title.slice(0,tidx),
        ...courseData.title.slice(tidx+1)
      ];
    }
    this.setState({courseData});
  }

  handleOnClickRemoveTopic(tidx, ttidx, event) {
    const courseData = Object.assign({},this.state.courseData);
    courseData.status = "success";
    courseData.message = "Topic is removed";
    if (ttidx ===0 && ttidx === (courseData.title[tidx].topic.length - 1)) {
      // always retain atleast one title
      courseData.status = "error";
      courseData.message = "You have to keep atleast one topic under a title";
      toastr.error("You have to keep atleast one topic under a title");
    } else if ( ttidx === 0) {
      courseData.title[tidx].topic = [
        ...courseData.title[tidx].topic.slice(ttidx + 1)
      ];
    } else if (ttidx === courseData.title[tidx].topic.length ){
      courseData.title[tidx].topic = [
        ...courseData.title[tidx].topic.slice(0, ttidx)
      ];
    } else {
      courseData.title[tidx].topic = [
        ...courseData.title[tidx].topic.slice(0, ttidx),
        ...courseData.title[tidx].topic.slice(ttidx + 1)
      ];
    }
    this.setState({courseData});
  }

  validateData() {
    const courseData = Object.assign({},this.state.courseData);
    let errorCount = 0;
    if (courseData.courseName.length < 5) {
      toastr.error("Enter a valid Course Name - minimum 5 characters");
      errorCount++;
    }
    courseData.title.forEach((title,index) => {
      if (title.courseTitle < 5) {
        toastr.error(`Course Title ${index} invalid - minimum 5 characters`);
        errorCount++;
      }
      if (!(/^http.*$/i.test(title.link)) || title.link.length < 10)  {
        toastr.error(`Enter a valid http link for Link ${index + 1}`);
        errorCount++;
      }
      title.topic.forEach((topic,idx) => {
        if (topic.topicName < "5") {
          toastr.error(`Enter a valid topic for Topic ${index + 1} - ${idx + 1}`);
          errorCount++;
        }
      });
    });
    return errorCount === 0 ? true : false;
  }

  handleOnClickSubmitCourse(event) {
    event.preventDefault();
    if (this.validateData()) {
      this.props.dispatch(AddCourseActions.addCourse(this.state.courseData));
    } else {
      const courseData = Object.assign({},this.state.courseData);
      courseData.status = "error";
      courseData.message = "validation error";
      this.setState({courseData});
    }
  }

  render() {
    console.log(this.state.courseData.isCourseSaved);
    console.log(this.props.courseData.isCourseSaved);

    if (this.props.userData.loggedIn !== true) {
      toastr.error("You have to login first");
      return <Redirect push to="/loginUser" />;
    }

    if (this.state.courseData.isCourseSaved) {
      return <Redirect push to="/allCourses" />;
    }

    return (
      <AddCourseForm
        isLoading={this.props.isLoading}
        courseName={this.state.courseData.courseName}
        title={this.state.courseData.title}
        handleOnChange={this.handleOnChange}
        handleOnTitleChange={this.handleOnTitleChange}
        handleOnTopicChange={this.handleOnTopicChange}
        handleOnClickAddTitle={this.handleOnClickAddTitle}
        handleOnClickRemoveTitle={this.handleOnClickRemoveTitle}
        handleOnClickAddTopic={this.handleOnClickAddTopic}
        handleOnClickRemoveTopic={this.handleOnClickRemoveTopic}
        handleOnClickSubmitCourse={this.handleOnClickSubmitCourse}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
//  console.log("inside mapStateToProps");
//  console.log(state.courseData);
  return {
    courseData: state.courseData,
    userData: state.userData,
    isLoading: state.isLoading
  };
}

AddCourse.propTypes = {
  courseData: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

AddCourse.defaultProps = {
  courseData: {},
  userData: {},
  dispatch: () => {},
  isLoading: false,
};

export default connect(mapStateToProps)(AddCourse);
