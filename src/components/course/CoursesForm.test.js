import React from "react";
import CoursesForm from "./CoursesForm";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";

describe("CoursesForm Test", () => {
  it("Snapshot - component should render", () => {
    const handleOnClickToggle = jest.fn();
    const handleOnClickEnroll = jest.fn();
    const component = renderer
      .create(
        <CoursesForm
          allCoursesData = {[{
            courseName: "",
            courseId: 0,
            title: [
              {
                courseTitleId: 0,
                courseTitle: "",
                link: "",
                courseId: 0,
                topic: [
                  {
                    topicId: 0,
                    topicName: ""
                  }
                ]
              }
            ]
          }]}
          btnClassName={["collapsible"]}
          panelClassName={["panelInactive"]}
          handleOnClickToggle = {handleOnClickToggle}
          handleOnClickEnroll = {handleOnClickEnroll}
        />,
      );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe ("Dom validation using enzyme", () => {
  function setup () {
    const props = {
      allCoursesData: [
        {
          courseName: "HTML",
          courseId: 1,
          title: [
            {
              courseTitleId: 1,
              courseTitle: "Fundamental",
              link: "https://stackoverflow.com/html",
              courseId: 1,
              topic: [
                {
                  topicId: 1,
                  topicName: "Basic tag"
                },
                {
                  topicId: 2,
                  topicName: "Form"
                }
              ]
            },
            {
              courseTitleId: 2,
              courseTitle: "Advanced Feature",
              link: "https://stackoverflow.com/advanced",
              courseId: 1,
              topic: [
                {
                  topicId: 3,
                  topicName: "Grid"
                }
              ]
            }
          ]
        }],
      btnClassName: ["collapsible"],
      panelClassName: ["panelInactive"],
      handleOnClickToggle : jest.fn(),
      handleOnClickEnroll : jest.fn()
    };
    return shallow(<CoursesForm {...props} />);
  }
  it("check for all elements inside CoursesForm", () => {
    const wrapper = setup();
    expect(wrapper.find("button").length).toBe(1); //one course
    expect(wrapper.find("input").length).toBe(1); //one enroll button
    expect(wrapper.find("a").length).toBe(2); //two anchor tags for link
    expect(wrapper.find("li").length).toBe(5); // no of lists = titles + topics
    //get initial class name for course & course details
    expect(wrapper.find("button").hasClass("collapsible")).toEqual(true);
    expect(wrapper.find("div").at(1).hasClass("panelInactive")).toEqual(true);
  });
});
