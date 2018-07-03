import React from 'react';
import LoginUserForm from './LoginUserForm';
import RegisterUser from './RegisterUser';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import * as LoginAction from '../../action/LoginAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import history from '../../history';

class LoginUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      register: false,
      userData: {
        name: '',
        sapId: '',
        emailId: '',
        primarySkill: '',
        band: '',
        password: '',
        status: '',
        message: '',
        loggedIn: false
      }
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClickLogin = this.handleOnClickLogin.bind(this);
    this.handleOnClickRegister = this.handleOnClickRegister.bind(this);
    this.validateData = this.validateData.bind(this);
  }

  componentWillMount() {
    let userData = {
      name: '',
      sapId: '',
      emailId: '',
      primarySkill: '',
      band: '',
      password: '',
      status: '',
      message: '',
      loggedIn: false
    };
    userData.emailId = this.props.userData.emailId === undefined ? '' :
      this.props.userData.emailId;
    userData.loggedIn = this.props.userData.loggedIn;
    this.setState({userData: userData});
  }

  componentDidUpdate(prevProps) {
//      console.log("Inside did update");
//    console.log(this.props);
//    console.log(prevProps);
    if (this.props.userData.status) {
//      console.log(this.state.userData);
      if (prevProps.userData.loggedIn !== this.props.userData.loggedIn ) {
        const { userData } = this.props;
        const toastrOptions = { timeOut: 1000 };
        if (this.props.userData.status === 'success') {
          toastr.success(this.props.userData.message,toastrOptions);
        } else {
          toastr.error(this.props.userData.message);
        }
        this.setState({userData});
      }
    }
  }

  handleOnChange(event) {
    const userData = Object.assign({},this.state.userData);
    const {id, value} = event.target;
    userData[id] = value;
    this.setState({userData});
  }

  validateData() {
    let errorCount = 0;
    if (this.state.userData.emailId === '') {
      toastr.error("Enter a valid User Name");
      errorCount++;
    }
    if (this.state.userData.password === '') {
      toastr.error("Enter a valid Password");
      errorCount++;
    }
    return errorCount === 0 ? true : false;
  }

  handleOnClickLogin(event) {
    event.preventDefault();
    this.validateData() ?
      this.props.dispatch(LoginAction.loginUser(this.state.userData))
      : '';
  }

  handleOnClickRegister(event) {
    event.preventDefault();
    console.log("inside on click register");
//    console.log(history);
//    history.push('/registerUser');
    this.setState({register: true});
  }

  render() {
    if (this.state.register) {
      return <Redirect push to="/registerUser" />;
    }

    if (this.props.userData.loggedIn) {
//      return this.props.history.push("/allCourses");
      return <Redirect push to="/allCourses" />;
    }

    return(
      <LoginUserForm
      emailId = {this.state.userData.emailId}
      password = {this.state.userData.password}
      handleOnChange ={this.handleOnChange}
      handleOnClickLogin={this.handleOnClickLogin}
      handleOnClickRegister={this.handleOnClickRegister} />
    );
  }
}

function mapStateToProps(state, ownProps) {
//  console.log('login user In mapStateToProps ' + state.userData.emailId);
//  console.log('in mapPropsToState - status is ' + state.userData.status +
//    ',message ' + state.userData.message );
  return {
    userData: state.userData
  };
}

LoginUser.propTypes = {
  userData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(LoginUser);
