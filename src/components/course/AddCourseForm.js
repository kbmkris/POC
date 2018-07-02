import React from 'react';
import styles from '../../css/index.css';
import { PropTypes } from 'prop-types';

/*
  id refers to actual field name.
  name refers to object it belongs to
  e.g. topic is an array of object with topicId & topicName as its properties
  so name will be mentioned as topic and id will be topicName
/*/
const AddCourseForm = ({
  courseName,
  title,
  handleOnChange,
  handleOnTitleChange,
  handleOnTopicChange,
  handleOnClickAddTitle,
  handleOnClickRemoveTitle,
  handleOnClickAddTopic,
  handleOnClickRemoveTopic,
  handleOnClickSubmitCourse
}) => {
  console.log("inside form");
  console.log(title);
  return (
  <div className="main-div">
  <div className="addcourse-div">
    <h3> Add Course Page </h3>
    <form>
      <label
        className="label"
        htmlFor="courseName" >
        Course Name :
      </label>
      <input
        type="text"
        className="input"
        name="courseName"
        value={courseName}
        onChange={handleOnChange} />
      <br />
      {title.map((title,tidx) => (
        <div key={`d${tidx}`}>
          <div>
            <label
              className="label"
              htmlFor="courseTitle" >
              Course Title {tidx + 1}:
            </label>
            <div>
              <input
                key={`title${tidx}`}
                type="text"
                className="input"
                name="courseTitle"
                value={title.courseTitle}
                onChange={(e) => handleOnTitleChange(tidx,e)} />
              <span>
                <input
                  key={`b${tidx}1`}
                  type="button"
                  className="small-button"
                  name="addTitle"
                  value=" + "
                  onClick={(e) => handleOnClickAddTitle(tidx,e)} />
              </span>
              <span>
                <input
                  key={`b${tidx}2`}
                  type="button"
                  className="small-button"
                  name="removeTitle"
                  value=" - "
                  onClick={(e) => handleOnClickRemoveTitle(tidx,e)} />
              </span>
              </div>
          </div>
          <div>
            <label
              className="label"
              htmlFor="link" >
              Course Link {tidx + 1}:
            </label>
              <input
                key={`link${tidx}`}
                type="text"
                className="input"
                name="link"
                value={title.link}
                onChange={(e) => handleOnTitleChange(tidx,e)} />
          </div>
          {title.topic.map((topic, ttidx) => (
            <div  key={`d${tidx}t${ttidx}`}>
              <label
                className="label"
                htmlFor="topic" >
                {`     Topic Name ${tidx + 1} - ${ttidx + 1}:`}
              </label>
              <div>
                <input
                  key={`topic${tidx}t${ttidx}`}
                  type="text"
                  className="input"
                  name="topicName"
                  value={topic.topicName}
                  onChange={(e) => handleOnTopicChange(tidx,ttidx,e)} />
                <span>
                  <input
                    key={`tbutton${tidx}1`}
                    type="button"
                    className="small-button"
                    value={' + '}
                    onClick={(e) => handleOnClickAddTopic(tidx,ttidx,e)} />
                  <input
                    key={`tbutton${tidx}2`}
                    type="button"
                    className="small-button"
                    value={' - '}
                    onClick={(e) => handleOnClickRemoveTopic(tidx,ttidx,e)} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="button-div">
        <input
          type="button"
          className="button"
          value="Add Course"
          onClick={handleOnClickSubmitCourse} />
        <br />
      </div>
    </form>
  </div>
  </div>
);
};
AddCourseForm.propTypes = {
  courseName : PropTypes.string.isRequired,
  title : PropTypes.array.isRequired,
  message : PropTypes.string.isRequired,
  handleOnChange : PropTypes.func.isRequired,
  handleOnTitleChange : PropTypes.func.isRequired,
  handleOnTopicChange : PropTypes.func.isRequired,
  handleOnClickAddTitle : PropTypes.func.isRequired,
  handleOnClickRemoveTitle: PropTypes.func.isRequired,
  handleOnClickAddTopic : PropTypes.func.isRequired,
  handleOnClickRemoveTopic : PropTypes.func.isRequired,
  handleOnClickSubmitCourse : PropTypes.func.isRequired
};

export default AddCourseForm;
