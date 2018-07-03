import React from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../css/index.css';

/*
  For input elements, mention id as userData property name so one
  handleOnChange can be used
*/

const LoginUserForm = ({
  emailId,
  password,
  handleOnChange,
  handleOnClickLogin,
  handleOnClickRegister
  }) =>  (
    <div className="main-div">
      <div className="login-div">
        <h3> Login Form </h3>
        <form className="login-form">
          <label
            className="label"
            htmlFor="emailId" >
            User Name :
          </label>
          <br />
          <input
            type="email"
            className="input"
            id="emailId"
            autoComplete="on"
            placeholder="Enter your email Id"
            value={emailId}
            onChange={handleOnChange} />
          <br />
          <label
            className="label"
            htmlFor="password" >
            Password :
          </label>
          <br />
          <input
            type="password"
            className="input"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChange} />
          <br />
          <div className="button-div">
            <button
              className="button button-left"
              onClick={handleOnClickLogin} >
            Login
            </button>
            <button
              className="button button-right"
              onClick={handleOnClickRegister} >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
);


LoginUserForm.propTypes = {
  emailId : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  handleOnChange : PropTypes.func.isRequired,
  handleOnClickLogin : PropTypes.func.isRequired,
  handleOnClickRegister : PropTypes.func.isRequired
};

export default LoginUserForm;
