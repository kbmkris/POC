import React from "react";
import AddCourseForm from "./AddCourseForm";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";

describe("AddCourseForm Test", () => {
  it("Snapshot - component should render", () => {
    const handleOnChange = jest.fn();
    const handleOnTitleChange = jest.fn();
    const handleOnTopicChange = jest.fn();
    const handleOnClickAddTitle = jest.fn();
    const handleOnClickRemoveTitle = jest.fn();
    const handleOnClickAddTopic = jest.fn();
    const handleOnClickRemoveTopic = jest.fn();
    const handleOnClickSubmitCourse = jest.fn();

    const component = renderer
      .create(
        <AddCourseForm
          isLoading={false}
          courseName= {""}
          title= {[{ topic: []}]}
          handleOnChange={handleOnChange}
          handleOnTitleChange={handleOnTitleChange}
          handleOnTopicChange={handleOnTopicChange}
          handleOnClickAddTitle={handleOnClickAddTitle}
          handleOnClickRemoveTitle={handleOnClickRemoveTitle}
          handleOnClickAddTopic={handleOnClickAddTopic}
          handleOnClickRemoveTopic={handleOnClickRemoveTopic}
          handleOnClickSubmitCourse={handleOnClickSubmitCourse}
        />,
      );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe ("Dom validation using enzyme", () => {
  function setup (isLoading) {
    const props = {
      isLoading: isLoading,
      courseName: "HTML",
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
      ],
      handleOnChange: jest.fn(),
      handleOnTitleChange: jest.fn(),
      handleOnTopicChange: jest.fn(),
      handleOnClickAddTitle: jest.fn(),
      handleOnClickRemoveTitle: jest.fn(),
      handleOnClickAddTopic: jest.fn(),
      handleOnClickRemoveTopic: jest.fn(),
      handleOnClickSubmitCourse: jest.fn(),
    };
    return shallow(<AddCourseForm {...props} />);
  }
  it("check for all elements inside AddCourseForm", () => {
    const wrapper = setup(false);
    expect(wrapper.find("h3").text()).toEqual(" Add Course Page ");
    expect(wrapper.find({name: "courseName"}).length).toBe(1);
    expect(wrapper.find({name: "courseTitle"}).length).toBe(2); // equal to no of titles in props
    expect(wrapper.find({name: "addTitleButton"}).length).toBe(2); //equal to no of titles in props
    expect(wrapper.find({name: "removeTitleButton"}).length).toBe(2); //equal to no of titles in props
    expect(wrapper.find({name: "topicName"}).length).toBe(3); //equal to no of topics in props
    expect(wrapper.find({name: "addTopicButton"}).length).toBe(3); //equal to no of topics in props
    expect(wrapper.find({name: "removeTopicButton"}).length).toBe(3); //equal to no of topics in props
    expect(wrapper.find({name: "addCourseButton"}).length).toBe(1);//one add course button
    console.log(wrapper.find({name: "courseName"}).debug());
  });

  it("check whether Add course button value changes on click", () => {
    const wrapper = setup(true);
    const addCourseButton = wrapper.find({name: "addCourseButton"});
    addCourseButton.simulate("click");
    expect(addCourseButton.prop("value")).toEqual("Adding Course...");
  });
});
