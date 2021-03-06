import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService.js";

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 character in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a  Target Date";
    }
    return errors;
  }

  onSubmit(values) {
    console.log(values);
  }

  componentDidMount() {
    let user = AuthenticationService.loggedInUsername();
    TodoDataService.retrieveTodo(user, this.state.id).then((response) =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      })
    );
  }

  render() {
    let { description, targetDate } = this.state;
    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
