import React from "react";
import styles from "../../css/index.css";
import { PropTypes } from "prop-types";


const CoursesForm = ({
  allCoursesData,
  btnClassName,
  panelClassName,
  handleOnClickToggle,
  handleOnClickEnroll
}) => (
    <div className="main-div">
      {allCoursesData.map((allCoursesData,idx) => (
        <React.Fragment key={idx}>
          <button
            className={btnClassName[idx]}
            name={`button${idx}`}
            onClick={(e) => handleOnClickToggle(e,idx)}>
          {allCoursesData.courseName}
          </button>
          <div className={panelClassName[idx]} name={`div{idx}`}>
          <input
            type="button"
            className="button enroll-button"
            onClick={(e) => handleOnClickEnroll(e,allCoursesData.courseId, allCoursesData.courseName)}
            value="Enroll" />
            <ul className="list">
              {allCoursesData.title.map((title,idx) => (
                <React.Fragment key={idx}>
                  <li key={`l${idx}`}>
                    <span className="title-span">
                      {title.courseTitle + "   -   "}
                    </span>
                    <a target="_blank" href={title.link}>{title.link}</a>
                  </li>
                  <ul className="inner-list">
                    {title.topic.map((topic,tidx) => (
                      <li key={tidx}>{topic.topicName}</li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ))}
    </div>
);


CoursesForm.propTypes = {
  allCoursesData : PropTypes.array.isRequired,
  btnClassName: PropTypes.array.isRequired,
  panelClassName: PropTypes.array.isRequired,
  handleOnClickToggle : PropTypes.func.isRequired,
  handleOnClickEnroll : PropTypes.func.isRequired
};

export default CoursesForm;
