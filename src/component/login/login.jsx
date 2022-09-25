import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../../services/authService";

// to get input data from form we should use currentTarget
// value and onchange should use for output state data
// we use joi-browser for validataion
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  // validateProperty = ({ name, value }) => {
  //   if (name === "username")
  //     if (value.trim() === "") return "Username is required";
  //   if (name === "password")
  //     if (value.trim() === "") return "Password is required";
  // };
  doSubmit = async (props) => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // to redirect to home page
      // this.props.history.push("/");insted of using push we use window to redirect
      // to add route to form. from state
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (er) {
      if (er.response && er.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = er.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderBtn("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
