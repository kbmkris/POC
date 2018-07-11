import React from "react";
import { shape } from "prop-types";
import { MemoryRouter } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";
import { LoginUser }  from "./LoginUser";
import { mount, shallow } from "enzyme";


describe("RegisterUser Container Component test using enzyme", () => {
  function setup(withRouter, isLoading) {
    const props = {
      userData: {
        name: "",
        sapId: 0,
        emailId: "",
        primarySkill: "",
        band: "",
        password: ""
      },
      isLoading: isLoading,
      cancelForm: false,
    };
    if (withRouter) {
      return mount(
        <MemoryRouter initialEntries={["/registerUser"]} >
          <RegisterUser {...props} />
        </MemoryRouter>
      );
    } else {
      return mount(
        <RegisterUser {...props} />
      );
    }
  }
  it ("No value for fields validation", () => {
    const wrapper = setup(false,false);
    const submitButton = wrapper.find("button").at(0);
    expect(submitButton.prop("name")).toBe("submitButton");
    submitButton.simulate("click");
//    console.log(wrapper.state());
    expect(wrapper.state().userData.status).toBe("error");
    expect(wrapper.state().userData.message).toBe("validation error");
  });
  it ("Check whether redirect happens when cancel button is clicked", () => {
    const wrapper = setup(true,false);
    const cancelButton = wrapper.find("button").at(1);
    expect(cancelButton.prop("name")).toBe("cancelButton");
    console.log(wrapper.state());
    cancelButton.simulate("click");

//    expect(wrapper.find(LoginUser)).toHaveLength(1);
  });

});
