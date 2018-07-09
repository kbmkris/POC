import React from 'react';
import UserReducer from './UserReducer';
import * as LoginActions from '../action/LoginAction';

describe('Test for UserReducer', () => {
  it('test LOGIN_USER', () => {
    const userData = {
      name: '',
      sapId: '',
      emailId: 'balamuralikrishnan.k@hcl.com',
      primarySkill: '',
      band: '',
      password: '********',
      status: '',
      message: '',
      loggedIn: false
    };
    const loggedUserData = {
      name: '',
      sapId: '',
      emailId: 'balamuralikrishnan.k@hcl.com',
      primarySkill: '',
      band: '',
      password: '********',
      status: 'success',
      message: 'Login Successful',
      loggedIn: false 
    };

    const action = LoginActions.loginUserSuccess(loggedUserData);

    const newState = UserReducer(userData, action);
    expect(newState).toEqual(loggedUserData);
  });
});
