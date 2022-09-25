import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./component/login/login";
import Movies from "./component/movie";
import MovieForm from "./component/movieform/movieform";
import Customer from "./component/navbar/customer";
import Generes from "./component/navbar/generes";
import NavBar from "./component/navbar/navbar";
import NotFound from "./component/navbar/notFound";
import Registion from "./component/Registion/register";
import ProtectedRoute from "./component/protectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./component/login/logout";
import auth from "./services/authService";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user}></NavBar>
        <ToastContainer></ToastContainer>
        <main className="container">
          <Switch>
            <ProtectedRoute
              path="/movies/:_id"
              component={MovieForm} 
            ></ProtectedRoute>
            <Route path="/register" component={Registion}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            ></Route>
            <Route path="/genre" component={Generes}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/customer" component={Customer}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
