import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import RegisterUserForm from "./RegisterUserForm";
import * as RegisterAction from "../../action/RegisterAction";
import { PropTypes } from "prop-types";

export class RegisterUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData: Object.assign (
        {},
        this.props.userData,
        {
          name: "",
          sapId: 0,
          emailId: "",
          primarySkill: "",
          band: "",
          password: "",
          status: "",
          message: "",
          loggedIn: false
        }),
      isLoading: false,
      cancelForm: false
    };
    this.validateData = this.validateData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this);
    this.handleOnClickCancel = this.handleOnClickCancel.bind(this);
  }

/*
  Note componentDidUpdate should include a check for current props vs previous
  props to avoid infinity render.
*/
  componentDidUpdate(prevProps) {
//    console.log("in componentDidUpdate " + this.props.userData.status + "," +
//      this.props.userData.message);
    if (this.props.userData.status !== prevProps.userData.status) {
      const { userData } = this.props;
      if (this.props.userData.status === "success") {
        toastr.success(this.props.userData.message);
      } else {
        toastr.error(this.props.userData.message);
      }
      this.setState({userData});
    }
  }

  handleOnChange(event) {
    const {id, value} = event.target;
    const userData = Object.assign({},this.state.userData);
    userData[id] = value;
    this.setState({ userData: userData});
  }

  validateData() {
    let errorCount = 0;
    if (this.state.userData.name === "" ||
        this.state.userData.name.length < 6) {
      toastr.error("Enter a valid Name - minimum six characters");
      errorCount++;
    }
    if (this.state.userData.sapId === 0 ) {
      toastr.error("Enter valid Sap ID - should be non zero");
      errorCount++;
    }
    const pattern = /^[a-z|A-Z|0-9]*@[a-z|A-Z|0-9]*\.[a-z|A-Z]*$/;
    if (!pattern.test(this.state.userData.emailId)) {
      toastr.error("Enter a valid email Id");
      errorCount++;
    }
    if (this.state.userData.primarySkill === "" ||
        this.state.userData.primarySkill.length < 3) {
      toastr.error("Enter a valid primary skill - minimum 3 characters");
      errorCount++;
    }
    if (this.state.userData.band === "") {
      toastr.error("Enter a valid band");
      errorCount++;
    }
    if (this.state.userData.password === "" ||
        this.state.userData.password.length < 6) {
      toastr.error("Enter a valid password - minimum 6 characters");
      errorCount++;
    }

    return errorCount === 0 ? true : false;
  }

  handleOnClickSubmit(event) {
    event.preventDefault();
//    console.log("Submit button clicked with " + this.state.userData.name);
    if (this.validateData()) {
      this.props.dispatch(RegisterAction.registerUser(this.state.userData));
    } else {
      const userData = Object.assign({},this.state.userData);
      userData.status = "error";
      userData.message = "validation error";
      this.setState({userData});
    }
  }

  handleOnClickCancel(event) {

    const cancelForm = true;
    this.setState({cancelForm});
  }

  render(){

    if (this.state.userData.status === "success") {
      return <Redirect push to="/loginUser" />;
    }

    if (this.state.cancelForm) {
      return <Redirect push to="/loginUser" />;
    }

//    const name = this.props.userData.name !== undefined;
    return(
      <RegisterUserForm
        name={this.state.userData.name}
        sapId={this.state.userData.sapId}
        emailId={this.state.userData.emailId}
        primarySkill={this.state.userData.primarySkill}
        band={this.state.userData.band}
        password={this.state.userData.password}
        isLoading={this.props.isLoading}
        handleOnChange={this.handleOnChange}
        handleOnClickSubmit={this.handleOnClickSubmit}
        handleOnClickCancel={this.handleOnClickCancel}
      />
    );
  }
}

function mapStateToProps (state, ownProps) {
//  console.log("In mapStateToProps " + state.userData.status + "," +
//    state.userData.message);
  return {
    userData: state.userData,
    isLoading: state.isLoading
  };
}

RegisterUser.propTypes = {
  userData : PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

RegisterUser.defaultProps = {
  userData: {
    name: "",
    sapId: "",
    emailId: "",
    primarySkill: "",
    band: "",
    password: "",
    status: "",
    message: "",
    loggedIn: false
  },
  isLoading: false,
  dispatch : () => {}
};

export default connect(mapStateToProps)(RegisterUser);
