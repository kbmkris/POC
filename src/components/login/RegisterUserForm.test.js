import React from "react";
import RegisterUserForm from "./RegisterUserForm";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";

describe("RegisterUserForm Test", () => {
  it("Snapshot - component should render", () => {
    const handleOnChange = jest.fn();
    const handleOnClickSubmit = jest.fn();
    const handleOnClickCancel = jest.fn();
    const component = renderer
      .create(
        <RegisterUserForm
          name={""}
          sapId={0}
          emailId={""}
          primarySkill={""}
          band={""}
          password={""}
          isLoading={false}
          handleOnChange={handleOnChange}
          handleOnClickSubmit={handleOnClickSubmit}
          handleOnClickCancel={handleOnClickCancel}
        />,
      );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe ("Dom validation using enzyme", () => {
  function setup (isLoading) {
    const props = {
      name: "",
      sapId: 0,
      emailId: "",
      primarySkill: "",
      band: "",
      password: "",
      isLoading: isLoading,
      handleOnChange: jest.fn(),
      handleOnClickSubmit: jest.fn(),
      handleOnClickCancel: jest.fn()
    };
    return shallow(<RegisterUserForm {...props} />);
  }
  it("check for all elements inside RegisterUserForm", () => {
    const wrapper = setup(false);
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h3").text()).toEqual(" Register New User ");
    expect(wrapper.find("input").length).toBe(6);
    expect(wrapper.find("button").length).toBe(2);
    expect(wrapper.find("#name").length).toBe(1);
    expect(wrapper.find("#sapId").length).toBe(1);
    expect(wrapper.find("#emailId").length).toBe(1);
    expect(wrapper.find("#band").length).toBe(1);
    expect(wrapper.find("#primarySkill").length).toBe(1);
    expect(wrapper.find("#password").length).toBe(1);
    expect(wrapper.find("button").at(0).text()).toEqual("Submit");
    expect(wrapper.find("button").at(1).text()).toEqual("Cancel");
  });
  it("check for submit button value changes when loading", () => {
    const wrapper = setup(true);
    expect(wrapper.find("button").at(0).text()).toEqual("Registering...");
   });
});
