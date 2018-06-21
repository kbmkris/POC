import React from 'react';
import LoginUser from './components/login/LoginUser';
import RegisterUser from './components/login/RegisterUser';
import CourseMain from './components/course/CourseMain';
import { Router, Route } from 'react-router-dom';
import history from './history';

const AppRoute = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={LoginUser} />
      <Route path="/loginUser" component={LoginUser} />
      <Route path="/registerUser" component={RegisterUser} />
      <Route path="/courseMain" component={CourseMain} />
    </div>
  </Router>
);

export default AppRoute;
