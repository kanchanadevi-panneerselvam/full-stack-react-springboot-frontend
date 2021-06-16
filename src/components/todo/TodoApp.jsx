import React, { Component } from "react";
class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <LoginComponent />
      </div>
    );
  }
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  render() {
    return (
      <div className="LoginComponent">
        User Name:{" "}
        <input
          type="text"
          name="username"
          value="halsy"
          onChange={this.handleUsernameChange}
        />
        Password: <input type="password" name="password" />
        <button>Login</button>
      </div>
    );
  }

  handleUsernameChange(event) {
    console.log(event.target.value);
  }
}

export default TodoApp;
