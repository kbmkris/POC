import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as LogoutActions from '../../action/LogoutAction';
import { PropTypes } from 'prop-types';

class LogoutUser extends React.Component {

  componentWillMount() {
    this.props.dispatch(LogoutActions.logoutUser());
  }

  render(){
    return (
      <Redirect push to="/loginUser" />
    );
  }
}

LogoutUser.propTypes = {
  dispatch : PropTypes.func.isRequired
};

export default connect()(LogoutUser);
