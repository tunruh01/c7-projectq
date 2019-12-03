import React, { Component } from "react";
import * as actions from "../actions/actions";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Navbar from "react-bootstrap/Navbar";
import {
  Form,
  Container,
  FormControl,
  Button,
  Nav,
  Image
} from "react-bootstrap";
import { Link } from "react-router-dom";

class Qnav extends Component {
  constructor() {
    super();

    this.resetToHome = this.resetToHome.bind(this);
  }

  resetToHome() {
    this.props.selectCategory("");
  }

  render() {
    const { authenticated } = this.props.auth;
    const { user } = this.props.auth;
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand font="monospace">Project Q</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.resetToHome} href="/">
              <i class="material-icons">home</i>
            </Nav.Link>
            <h6 className="text-center">
              {authenticated ? (
                <Navbar.Text>Welcome {user.name}</Navbar.Text>
              ) : null}
            </h6>
          </Nav>
          <Form inline>
            <FormControl
              size="sm"
              type="text"
              placeholder="Search Questions"
              className="col-xs-8 mr-2"
            />
            <Button variant="outline-secondary mr-2" size="sm">
              Search
            </Button>
          </Form>
          <Form inline>
            <Link exact to="/question">
              <Button variant="outline-secondary mr-2" size="sm">
                Ask Question
              </Button>
            </Link>
            <Image
              src="https://s3.amazonaws.com/creativetim_bucket/new_logo.png"
              roundedCircle
            />
          </Form>
          <Form inline>
            {!authenticated ? (
              <Button
                variant="outline-dark mr-2"
                size="sm"
                onClick={this._handleSignInClick}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="outline-dark mr-2"
                size="sm"
                onClick={this._handleLogoutClick}
              >
                Logout
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:5000/auth/google", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:5000/auth/logout", "_self");
  };
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actions)(Qnav);
