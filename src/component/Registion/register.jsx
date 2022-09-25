import joi from "joi-browser";
import React from "react";
import Form from "../login/form";
import * as usrSer from "../../services/userServices";
import auth from '../../services/authService'

class Registion extends Form {
  state = {
    data: { username: "", password: "", full_name: "" },
    errors: {},
  };

  schema = {
    username: joi.string().required().email(),
    password: joi.string().required().min(5),
    full_name: joi.string().required(),
  };

  doSubmit = async () => {
    try {
      const response = await usrSer.register(this.state.data);
      auth.loginWithJwt(response.data["x-auth-token"]);
      window.location = "/login"
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("full_name", "Full Name")}
          {this.renderBtn("Register")}
        </form>
      </div>
    );
  }
}

export default Registion;
