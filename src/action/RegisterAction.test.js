import React from "react";
import { mount } from "enzyme";
import * as actionTypes from "../constants/actionTypes";
import * as RegisterActions from "./RegisterAction";
import thunk from "redux-thunk";
import nock from "nock";
import configureStore from "redux-mock-store";

describe("Test for RegisterAction action", () => {
  it ("Check RegisterUserSuccess action", () => {
    const userData = {
      name: "Test User 10",
      sapId: 10,
      emailId: "testuser10@hcl.com",
      primarySkill: "Java",
      band: "E1.1",
      password: "********",
      status: "success",
      message: "Register Successful",
      loggedIn: false,
      isLoading: false,
    };
    const expectedAction = {
      type : actionTypes.REGISTER_USER,
      userData
    };
    const action = RegisterActions.registerUserSuccess(userData);
    expect(action).toEqual(expectedAction);
  });
});

describe ("test thunk in registerUser",() => {

  afterEach(() => {
    nock.cleanAll();
  });

  it("should call API and then call registerUserSuccess", (done) => {
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
        type:  actionTypes.REGISTER_USER,
        userData: {
          name: "Test User 10",
          sapId: 10,
          emailId: "testuser10@hcl.com",
          primarySkill: "Java",
          band: "E1.1",
          password: "********",
          status: "success",
          message: "Register Successful",
          loggedIn: false,
          isLoading: false,
        }
      }
    ];
    const userData = {
      name: "Test User 10",
      sapId: 10,
      emailId: "testuser10@hcl.com",
      primarySkill: "Java",
      band: "E1.1",
      password: "********",
      status: "",
      message: "",
      loggedIn: false,
      isLoading: false,
    };

    nock("http://localhost:3000")
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .post("/users/rest/registerUser",
        "name=Test User 10&sapId=10&emailId=testuser10@hcl.com&primarySkill=Java&band=E1.1&password=********"
      )
      .reply(200,{status: "success", message: "Register Successful"});
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({}, expectedActions);
    store.dispatch(RegisterActions.registerUser(userData))
      .then(() => {
        const actions = store.getActions();
        //PAGE_LOADING_START
        expect(actions[0].type).toEqual(expectedActions[0].type);
        //PAGE_LOADING_COMPLETE
        expect(actions[1].type).toEqual(expectedActions[1].type);
        //REGISTER_USER
        expect(actions[2].type).toEqual(expectedActions[2].type);
        done();
      });
  });
});
