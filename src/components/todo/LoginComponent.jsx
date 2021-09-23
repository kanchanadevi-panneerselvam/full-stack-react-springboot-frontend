import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "kanchana",
      passWord: "",
      isLoginSuccess: false,
      hasloginFailed: false,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePassWordChange = this.handlePassWordChange.bind(this);
    this.checkUserCredentials = this.checkUserCredentials.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handlePassWordChange(event) {
    this.setState({ passWord: event.target.value });
  }

  checkUserCredentials() {
    if (this.state.userName === "kanchana" && this.state.passWord === "root") {
      AuthenticationService.registerSuccessfulLogin(
        this.state.userName,
        this.state.passWord
      );
      this.props.history.push(`/welcome/${this.state.userName}`);
      this.setState({ hasloginFailed: false });
      this.setState({ isLoginSuccess: true });
    } else {
      this.setState({ isLoginSuccess: false });
      this.setState({ hasloginFailed: true });
    }
  }

  render() {
    return (
      <div className="LoginComponent">
        <h1> Login</h1>
        <div className="container">
          {/* <ShowUserLoginMessage
              hasLoginSuccess={this.state.isLoginSuccess}
              hasLoginFailed={this.state.hasloginFailed}
            />
            <ShowInvalieUserLoginMessage
              hasLoginSuccess={this.state.isLoginSuccess}
              hasLoginFailed={this.state.hasloginFailed}
            /> */}
          {this.state.hasloginFailed && (
            <div className="alert alert-warning"> Invalid Credentials</div>
          )}
          {this.state.hasLoginSuccess && <div> Login Successful</div>}
          User Name:{" "}
          <input
            type="text"
            name="username"
            value={this.state.userName}
            onChange={this.handleUsernameChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={this.state.passWord}
            onChange={this.handlePassWordChange}
          />
          <button
            className="btn btn-success"
            onClick={this.checkUserCredentials}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
