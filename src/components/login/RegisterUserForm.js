import React from 'react';
import styles from '../../css/index.css';
import { PropTypes } from 'prop-types';

const RegisterUserForm = ({
  name,
  sapId,
  emailId,
  primarySkill,
  band,
  password,
  handleOnChange,
  handleOnClickSubmit,
  handleOnClickCancel
}) => (
  <div className="main-div">
    <div className="register-div">
      <h3> Register New User </h3>
      <form>
        <label
          className="label"
          htmlFor="name" >
          Name :
        </label>
        <input
          type="text"
          className="input"
          id="name"
          value={name}
          onChange={handleOnChange} />
        <br />
        <label
          className="label"
          htmlFor="sapId" >
          Sap Id :
        </label>
        <input
          type="number"
          className="input"
          id="sapId"
          value={sapId}
          onChange={handleOnChange} />
        <br />
        <label
          className="label"
          htmlFor="emailId" >
          Email Id :
        </label>
        <input
          type="email"
          className="input"
          id="emailId"
          value={emailId}
          onChange={handleOnChange} />
        <br />
        <label
          className="label"
          htmlFor="band" >
          Band :
        </label>
        <input
          type="text"
          className="input"
          id="band"
          value={band}
          onChange={handleOnChange} />
        <br />
        <label
          className="label"
          htmlFor="primarySkill" >
          Primary Skill :
        </label>
        <input
          type="text"
          className="input"
          id="primarySkill"
          value={primarySkill}
          onChange={handleOnChange} />
        <br />
        <label
          className="label"
          htmlFor="password" >
          Password :
        </label>
        <input
          type="password"
          className="input"
          id="password"
          value={password}
          onChange={handleOnChange} />
        <br />
        <div className="button-div">
          <button
            className="button"
            onClick={handleOnClickSubmit} >
            Submit
          </button>
          <button
            className="button"
            onClick={handleOnClickCancel} >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);


RegisterUserForm.propTypes = {
  name : PropTypes.string.isRequired,
  sapId : PropTypes.number.isRequired,
  emailId : PropTypes.string.isRequired,
  primarySkill : PropTypes.string.isRequired,
  band : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  handleOnChange : PropTypes.func.isRequired,
  handleOnClickSubmit : PropTypes.func.isRequired,
  handleOnClickCancel : PropTypes.func.isRequired
};

export default RegisterUserForm;
