import React from 'react';
import LoginForm from './LoginForm';
import RegisterUser from './RegisterUser';
import * as LoginActions from '../../action/LoginAction';
import { connect } from 'react-redux';

class LoginUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
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
    console.log('Inside component will mount' + this.props.userData.emailId);
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
    console.log(userData);
    this.setState({userData: userData});
  }

/*  componentDidUpdate(prevState) {
    if (this.userData.status) {
    if (prevState.userData.status !== this.userData.status) {
      console.log('Previous state is ' + prevState.userData.status);
      console.log('Current state is ' + this.userData.status);
    }
   }
  }
*/
  componentDidMount() {
    console.log('Component Mounted with status as ' + this.props.userData);
  }

  componentDidUpdate() {
    console.log('In componentDidUpdate ' + this.props.userData.emailId);
  }

  handleOnChange(event) {
    const userData = Object.assign({},this.state.userData);
    const {id, value} = event.target;
    userData[id] = value;
    this.setState({userData});
  }

  validateData() {
    if (this.state.userData.emailId !== '' && this.state.userData.password) {
      return true;
    } else {
      const userData = Object.assign({},this.state.userData);
      userData.message = 'Enter User Name and Password to Login';
      this.setState({userData});
      return false;
    }
  }

  handleOnClickLogin(event) {
    event.preventDefault();
    console.log('Submitted');
    this.validateData() ?
      this.props.dispatch(LoginActions.loginUser(this.state.userData))
      : '';
  }

  handleOnClickRegister(event) {
    event.preventDefault();
    console.log("Clicked on Register link");
    this.props.history.push("/registerUser");
  }

  render() {
    return(
      <LoginForm
      emailId = {this.state.userData.emailId}
      password = {this.state.userData.password}
      message = {this.state.userData.message}
      handleOnChange ={this.handleOnChange}
      handleOnClickLogin={this.handleOnClickLogin}
      handleOnClickRegister={this.handleOnClickRegister} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('login user In mapStateToProps ' + state.userData.emailId);
  return {
    userData: state.userData
  };
}

export default connect(mapStateToProps)(LoginUser);
