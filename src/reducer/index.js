import { combineReducers } from 'redux';
import userData from './UserReducer';
import courseData from './CourseReducer';
import allCoursesData from './AllCoursesReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import * as actionTypes from '../constants/actionTypes';

const rootReducer = combineReducers({
    userData,
    courseData,
    allCoursesData,
    toastr: toastrReducer
  }
);

export default rootReducer;
