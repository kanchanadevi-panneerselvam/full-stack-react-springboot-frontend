import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "",
      errorMessage: "",
    };
    this.retrieveMessage = this.retrieveMessage.bind(this);
    this.handleWelcomeMessage = this.handleWelcomeMessage.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }
  render() {
    return (
      <div className="WelcomeComponent">
        <h1> Welcome</h1>
        <div className="container">
          Welcome {this.props.match.params.name}. Click the Link to go todos
          page <Link to="/todos">here.</Link>
        </div>

        <div className="container">
          Click here to get the customized welcome message
          <button className="btn btn-success" onClick={this.retrieveMessage}>
            Get Welcome Message
          </button>
        </div>
        {this.state.welcomeMessage}
        <div className="container"></div>
      </div>
    );
  }

  retrieveMessage() {
    // HelloWorldService.executeHelloWorldBeanService().then((response) =>
    //   this.handleWelcomeMessage(response)
    // );

    HelloWorldService.executeHelloWorldPathVariableService(
      this.props.match.params.name
    )
      .then((response) => this.handleWelcomeMessage(response))
      .catch((error) => this.handleErrorMessage(error));
  }
  handleWelcomeMessage(response) {
    this.setState({
      welcomeMessage: response.data.message,
    });
  }

  handleErrorMessage(error) {
    this.setState({
      errorMessage: error.response.data.message,
    });
  }
}

export default WelcomeComponent;
