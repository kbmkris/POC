import React from 'react';
import styles from '../../css/index.css';
import { PropTypes } from 'prop-types';

const CourseTrackerUpdateForm = ({
  doIShowModal,
  modalCourseData,
  options,
  handleOnChange,
  handleOnClickCancel,
  handleOnClickUpdateStatus
}) => {
  if (doIShowModal === false) {
    return null;
  }
  return (
    <div className="modal-container">
      <div className="modal-box">
        <h3> Course Status Update </h3>
        <div className="modal-content">
        <form>
          <label
            className="label"
            htmlFor="COURSE_ID" >
            Course Id :
          </label>
          <input
            type="text"
            className="input"
            readOnly="true"
            disabled="true"
            value={modalCourseData.COURSE_ID} />
          <br />
          <label
            className="label"
            htmlFor="COURSE_NAME" >
            Course Name :
          </label>
          <input
            type="text"
            className="input"
            readOnly="true"
            disabled="true"
            value={modalCourseData.COURSE_NAME} />
          <br />
          <label
            className="label"
            htmlFor="STATUS" >
            Status :
          </label>
          <select
            onChange={handleOnChange}
            value={modalCourseData.STATUS}
            className="input"
            name="STATUS">
            {options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
          <br />
          <label
            className="label"
            htmlFor="TEACHOTHERS" >
            Teach Others :
          </label>
          <input
            type="checkbox"
            className="checkbox"
            checked={modalCourseData.TEACHOTHERS}
            name="TEACHOTHERS"
            onChange={handleOnChange}/>
          <br />
          <div className="combine">
          <label
            className="label"
            htmlFor="COMMENTS" >
            Comments :
          </label>
          <textarea
            rows="3"
            cols="50"
            className="input"
            value={modalCourseData.COMMENTS}
            onChange={handleOnChange}
            name="COMMENTS" />
          <br />
          </div>
          <div className="button-div">
            <input
              type="submit"
              className="button"
              value="Update"
              onClick={handleOnClickUpdateStatus} />
            <input
              type="button"
              className="button"
              value="Cancel"
              onClick={handleOnClickCancel} />
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

CourseTrackerUpdateForm.propTypes = {
  doIShowModal : PropTypes.bool.isRequired,
  modalCourseData : PropTypes.object.isRequired,
  options : PropTypes.array.isRequired,
  handleOnChange : PropTypes.func.isRequired,
  handleOnClickCancel : PropTypes.func.isRequired,
  handleOnClickUpdateStatus : PropTypes.func.isRequired
};

export default CourseTrackerUpdateForm;
