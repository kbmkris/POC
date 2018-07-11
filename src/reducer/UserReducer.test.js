import React from "react";
import UserReducer from "./UserReducer";
import * as LoginActions from "../action/LoginAction";
import * as RegisterActions from "../action/RegisterAction";

describe("Test for UserReducer", () => {
  it("test LOGIN_USER", () => {
    const userData = {
      name: "",
      sapId: "",
      emailId: "balamuralikrishnan.k@hcl.com",
      primarySkill: "",
      band: "",
      password: "********",
      status: "",
      message: "",
      loggedIn: false
    };
    const loggedUserData = {
      name: "",
      sapId: "",
      emailId: "balamuralikrishnan.k@hcl.com",
      primarySkill: "",
      band: "",
      password: "********",
      status: "success",
      message: "Login Successful",
      loggedIn: false
    };

    const action = LoginActions.loginUserSuccess(loggedUserData);
    const newState = UserReducer(userData, action);
    expect(newState).toEqual(loggedUserData);
  });

  it("test REGISTER_USER", () => {
    const userData = {
      name: "Test User 10",
      sapId: 10,
      emailId: "testuser10@hcl.com",
      primarySkill: "Java",
      band: "E1.1",
      password: "********",
      status: "",
      message: "",
      loggedIn: false
    };
    const registerUserData = {
      name: "Test User 10",
      sapId: 10,
      emailId: "testuser10@hcl.com",
      primarySkill: "Java",
      band: "E1.1",
      password: "********",
      status: "success",
      message: "Register Successful",
      loggedIn: false
    };

    const action = RegisterActions.registerUserSuccess(registerUserData);
    const newState = UserReducer(userData, action);
    expect(newState).toEqual(registerUserData);
  });

});
