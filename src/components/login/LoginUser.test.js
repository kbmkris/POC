import React from 'react';
import { shape } from 'prop-types';
import { Router } from 'react-router-dom';
import {LoginUser} from './LoginUser';
import { mount, shallow } from 'enzyme';
import history from '../../history';

describe('Login User Container Component test using enzyme', () => {
  function setup(emailId = '', password='') {
    const props = {
      emailId : emailId,
      password : password,
      handleOnChange : jest.fn,
      handleOnClickLogin : jest.fn(),
      handleOnClickRegister : jest.fn()
    };
    const router = {
      history: history,
      route: {
        location: { pathname: "/loginUser"},
        match: {
          isExact: false,
          params: {},
          path: '/',
          url: 'http://localhost:3001/'
        },
      },
    };

    const createContext = () => ({
      context: { router },
      childContextTypes: { router: shape({})},
    });

    return mount(<LoginUser {...props} />,createContext());
  }
  it ('No value for user name validation', () => {
    const wrapper = setup();
    const loginButton = wrapper.find('button').at(0);
    expect(loginButton.prop('name')).toBe('loginButton');
    loginButton.simulate('click');
    expect(wrapper.state().userData.status).toBe('error');
    expect(wrapper.state().userData.message).toBe('validation error');
  });
//  it ('Check whether redirect happens when register button is clicked', () => {
//    const wrapper = setup();
//    const registerButton = wrapper.find('button').at(1);
//    expect(registerButton.prop('name')).toBe('registerButton');
//    registerButton.simulate('click');
//  });

});
