import React from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../css/Login.css';

/*
  For input elements, mention id as userData property name so one
  handleOnChange can be used
*/

const LoginForm = ({
  emailId,
  password,
  message,
  handleOnChange,
  handleOnClickLogin,
  handleOnClickRegister
  }) => {
//    console.log('Inside login form');
  return (
    <div className="login-div">
      <h3> Login Form </h3>
      <form>
        <label
          className="label"
          htmlFor="emailId" >
          User Name :
        </label>
        <input
          type="email"
          className="input"
          id="emailId"
          placeholder="Enter your email Id"
          value={emailId}
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
          <input
            type="submit"
            className="button"
            onClick={handleOnClickLogin}
            value="Login" />
          <input
            type="button"
            className="button"
            onClick={handleOnClickRegister}
            value="Register - New user" />
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
};

//LoginForm.propTypes = {
//  props: PropTypes.object.isRequired
//};

export default LoginForm;
