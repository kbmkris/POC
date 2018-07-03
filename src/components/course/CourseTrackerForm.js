import React from 'react';
import styles from '../../css/index.css';
import { PropTypes } from 'prop-types';

const CourseTrackerForm = ({
  enrolledCourses,
  handleOnClickUpdate
}) => (
  <div className="main-div">
    <table>
      <thead>
        <tr className="headRow">
          <th>Course ID</th>
          <th>Course Name</th>
          <th>Status</th>
          <th>Comments </th>
          <th>Teach Others</th>
          <th />
        </tr>
        {enrolledCourses.map((course,idx) => (
          <React.Fragment
            key={idx} >
            <tr >
              <td className="td-id">{course.COURSE_ID}</td>
              <td className="td-name">{course.COURSE_NAME}</td>
              <td className="td-status">{course.STATUS}</td>
              <td className="td-comments">{course.COMMENTS}</td>
              <td className="td-teachothers">{course.TEACHOTHERS === false ? 'No' : 'Yes' }
              </td>
              <td>
                <input
                  type="submit"
                  className={course.STATUS === 'Completed'? 'button-disabled' : 'button'}
                  value="Update"
                  disabled={course.STATUS === 'Completed' ? 'disabled' : ''}
                  onClick={(e) => handleOnClickUpdate(e,idx)} />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </thead>
    </table>
  </div>
);

CourseTrackerForm.propTypes = {
  enrolledCourses : PropTypes.array.isRequired,
  handleOnClickUpdate : PropTypes.func.isRequired
};

export default CourseTrackerForm;
