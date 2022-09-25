import { Link, NavLink } from "react-router-dom";
import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link active">
              Movies <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink to="/customer" className="nav-item nav-link">
              Customer
            </NavLink>
            <NavLink to="/genre" className="nav-item nav-link">
              Genre
            </NavLink>
            {this.props.user ? (
              <React.Fragment>
                <NavLink to="/profile" className="nav-item nav-link">
                  {this.props.user.name}
                </NavLink>
                <NavLink to="/logout" className="nav-item nav-link">
                  Logout
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink to="/login" className="nav-item nav-link">
                  login
                </NavLink>
                <NavLink to="/register" className="nav-item nav-link">
                  Register
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
