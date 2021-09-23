import "./App.css";
import "./bootstrap.css";

import React, { Component } from "react";
// import Counter from "./components/counter/Counter.jsx";
import TodoApp from "./components/todo/TodoApp";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter /> */}
        <TodoApp />
      </div>
    );
  }
}

export default App;
