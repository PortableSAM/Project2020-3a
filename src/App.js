import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginForm } from "./Components/LoginForm";
import { SignUp } from "./Components/SignUpForm";

function App() {
  return (
    <Router>
      <div>
        <h2>Project 2020-3a</h2>
      </div>
      <Route exact path="/" component={LoginForm} />
      <Route path="/signup" component={SignUp} />
    </Router>
  );
}

export default App;
