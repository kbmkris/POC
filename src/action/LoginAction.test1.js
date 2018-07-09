import React from 'react';
import { mount } from 'enzyme';
import * as actionTypes from '../constants/actionTypes';
import * as LoginActions from './LoginAction';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureStore from 'redux-mock-store';

describe('Test for LoginAction action', () => {
  it ('Check loginUserSuccess action', () => {
    const userData = {
      name: '',
      sapId: '',
      emailId: 'balamuralikrishnan.k@hcl.com',
      primarySkill: '',
      band: '',
      password: '********',
      status: '',
      message: '',
      loggedIn: false,
      isLoading: false,
    };
    const expectedAction = {
      type : actionTypes.LOGIN_USER,
      userData
    };
    const action = LoginActions.loginUserSuccess(userData);
    expect(action).toEqual(expectedAction);
  });
});

describe ('test thunk in loginUser',() => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should call API and then call loginUserSuccess', (done) => {
    const expectedActions = [
      {
        type: actionTypes.PAGE_LOADING_START,
        isLoading: true
      },
      {
        type: actionTypes.PAGE_LOADING_COMPLETE,
        isLoading: false
      },
      {
        type:  actionTypes.LOGIN_USER,
        userData: {
          name: '',
          sapId: '',
          emailId: 'balamuralikrishnan.k@hcl.com',
          primarySkill: '',
          band: '',
          password: 'india123',
          status: 'success',
          message: 'Login Successful',
          loggedIn: false 
        }
      }
    ];
    const userData = {
      name: '',
      sapId: '',
      emailId: 'balamuralikrishnan.k@hcl.com',
      primarySkill: '',
      band: '',
      password: 'india123',
      status: '',
      message: '',
      loggedIn: false
    };

    nock('http://localhost:3000')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/users/rest/login',
        'userName=balamuralikrishnan.k@hcl.com&password=india123')
      .reply(200,{status: 'success', message: 'Login Successful'});
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({}, expectedActions);
    store.dispatch(LoginActions.loginUser(userData))
      .then(() => {
        const actions = store.getActions();
        console.log(actions);
        //PAGE_LOADING_START
        expect(actions[0].type).toEqual(expectedActions[0].type);
        //PAGE_LOADING_COMPLETE
        expect(actions[1].type).toEqual(expectedActions[1].type);
        //LOGIN_USER
        expect(actions[2].type).toEqual(expectedActions[2].type);
        done();
      });
  });
});
