import React from "react";
import { createStore } from "redux";
import rootReducer from "../reducer";
import * as LoginActions from "../action/LoginAction";
import nock from "nock";

describe("Store", () => {
  it("Test Store > Reducer > action without async", () => {
    const initialStore = {};
    const store = createStore(
      rootReducer,
      initialStore
    );
    const userData = {
      name: "",
      sapId: "",
      emailId: "balamuralikrishnan.k@hcl.com",
      primarySkill: "",
      band: "",
      password: "********",
      status: "",
      message: "",
      loggedIn: false,
      isLoading: false,
    };

    const expectedUserData = {
      name: "",
      sapId: "",
      emailId: "balamuralikrishnan.k@hcl.com",
      primarySkill: "",
      band: "",
      password: "********",
      status: "",
      message: "",
      loggedIn: false,
      isLoading: false,
    };

    const action = LoginActions.loginUserSuccess(userData);
    store.dispatch(action);
    const actual = store.getState().userData;
    expect(actual).toEqual(expectedUserData);
  });
});
