import React from "react";
import AllCoursesReducer from "./AllCoursesReducer";
import * as AllCoursesActions from "../action/AllCoursesAction";

describe("Test for AllCoursesReducer", () => {
  it("test GET_ALL_COURSES", () => {
    const allCoursesData = [];
    const expectedallCoursesData = [
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
      }];
    const action = AllCoursesActions.getAllCoursesSuccess(expectedallCoursesData);
    const newState = AllCoursesReducer(allCoursesData, action);
    expect(newState).toEqual(expectedallCoursesData);
  });
  it("test GET_RECOMMENDED_COURSES", () => {
    const allCoursesData = [];
    const expectedallCoursesData = [
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
      }];
    const action = AllCoursesActions.getAllCoursesSuccess(expectedallCoursesData);
    const newState = AllCoursesReducer(allCoursesData, action);
    expect(newState).toEqual(expectedallCoursesData);
  });

});
