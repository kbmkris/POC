import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import * as RegisterAction from '../../action/RegisterAction';

class RegisterUser extends React.Component {

  constructor(props){
    super(props);
    console.log('in constructor');
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
    this.handleOnClick = this.handleOnClick.bind(this);
  }

/*
  Note componentDidUpdate should include a check for current props vs previous
  props to avoid infinity render.
*/
  componentDidUpdate(prevProps) {
    console.log("in componentDidUpdate " + this.props.userData.status + ',' +
      this.props.userData.message);
    if (this.props.userData.status !== prevProps.userData.status) {
      const { userData } = this.props;
      this.setState({userData});
    }
  }

  handleOnChange(event) {
    const {id, value} = event.target;
    const userData = Object.assign({},this.state.userData);
    userData[id] = value;
    this.setState({ userData: userData});
  }

  handleOnClick(event) {
    event.preventDefault();
    console.log("Submit button clicked with " + this.state.userData.name);
    this.props.dispatch(RegisterAction.registerUser(this.state.userData));
  }

  render(){
    const name = this.props.userData.name !== undefined
    return(
      <RegisterForm
        name={this.state.userData.name}
        sapId={this.state.userData.sapId}
        emailId={this.state.userData.emailId}
        primarySkill={this.state.userData.primarySkill}
        band={this.state.userData.band}
        password={this.state.userData.password}
        message={this.state.userData.message}
        handleOnChange={this.handleOnChange}
        handleOnClick={this.handleOnClick}
      />
    )
  }
}

function mapStateToProps (state, ownProps) {
  console.log('In mapStateToProps ' + state.userData.status + ',' +
    state.userData.message);
  return {
    userData: state.userData
  };
}

export default connect(mapStateToProps)(RegisterUser);
