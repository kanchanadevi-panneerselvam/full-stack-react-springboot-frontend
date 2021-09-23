import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class ListOfTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
    };
    this.refreshTodos = this.refreshTodos.bind(this);
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
  }

  componentDidMount() {
    let user = AuthenticationService.loggedInUsername();
    this.refreshTodos(user);
  }
  render() {
    return (
      <div className="ListOfTodosComponent">
        <h1>List Todos</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Target Date</th>
                <th>Is Completed?</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>{todo.done.toString()}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  deleteTodoClicked(id) {
    let user = AuthenticationService.loggedInUsername();
    TodoDataService.deleteTodo(user, id).then((response) => {
      this.setState({ message: `Delete of Todo ${id} successful` });
      this.refreshTodos(user);
    });
  }

  updateTodoClicked(id) {
    this.props.history.push(`/todos/${id}`);
  }

  refreshTodos(user) {
    TodoDataService.retrieveAllTodos(user).then((response) => {
      this.setState({ todos: response.data });
    });
  }
}
export default ListOfTodosComponent;
