import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";
import Projects from "./Projects";
import Resume from "./components/Resume";
import Profile from "./Profile";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "./fileupload";

import "./styling/MyApp.css";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import CreatePost2 from "./components/CreatePost2";
import EditPost from "./components/EditPost";
import PostsList from "./components/PostsList";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useCookies } from "react-cookie";
import Intropage from "./components/IntroPage";
import CreateProfile from "./components/CreateProfile";
import ProfilePage from "./components/ProfilePage";

function MyApp() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [show, setShow] = useState(false);

  function setToken(token) {
    setCookie("auth_token", token, { maxAge: 1800, path: "/" });
    console.log("This is our current token: " + token);
    console.log("This is the cookie after being set: " + cookies.auth_token);
  }
  console.log("This is cookies: " + cookies);
  console.log("THis is cookies 0th idnex: " + JSON.stringify(cookies));

  function logout() {
    console.log("Here");
    removeCookie("auth_token");
    console.log(cookies === undefined);
    console.log(cookies[0]);
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/"} className="nav-link">
                  Resumix
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                {cookies.auth_token && (
                  <Nav>
                    <Link to={"/posts-list"} className="nav-link">
                      Posts List
                    </Link>
                  </Nav>
                )}
                {cookies.auth_token && (
                  <Nav>
                    <Link to={"/resume"} className="nav-link">
                      Resume
                    </Link>
                  </Nav>
                )}
                {!cookies.auth_token && (
                  <Nav>
                    <Link to={"/signup"} className="nav-link">
                      Sign Up
                    </Link>
                  </Nav>
                )}
                {!cookies.auth_token && (
                  <Nav>
                    <Link to={"/signin"} className="nav-link">
                      Sign In
                    </Link>
                  </Nav>
                )}
                {cookies.auth_token && (
                  <Nav>
                    <button onClick={logout}>Logout</button>
                  </Nav>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  {!cookies.auth_token && (
                    <Route exact path="/">
                      <Intropage />
                    </Route>
                  )}
                  {cookies.auth_token && (
                    <Route exact path="/">
                      <h1>This is the profile page</h1>
                      <ProfilePage cookies={cookies} />
                    </Route>
                  )}
                  {cookies.auth_token && (
                    <Route exact path="/create-post">
                      <CreatePost2 cookies={cookies} />
                    </Route>
                  )}
                  {cookies.auth_token && (
                    <Route exact path="/createprofile">
                      <CreateProfile />
                    </Route>
                  )}
                  {cookies.auth_token && (
                    <Route
                      exact
                      path="/edit-post/:id"
                      component={(props) => <EditPost {...props} />}
                    />
                  )}
                  {cookies.auth_token && (
                    <Route exact path="/posts-list">
                      <PostsList cookies={cookies} />
                    </Route>
                  )}
                  {cookies.auth_token && (
                    <Route
                      exact
                      path="/resume"
                      component={(props) => <Resume {...props} />}
                    />
                  )}
                  {!cookies.auth_token && (
                    <Route
                      exact
                      path="/signup"
                      component={(props) => <SignUp {...props} />}
                    />
                  )}
                  {!cookies.auth_token && (
                    <Route exact path="/signin">
                      <SignIn setToken={setToken} />
                    </Route>
                  )}
                  {/* {!cookies.auth_token &&<Route exact path="*">
                        <Intropage />
                    </Route>} */}
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default MyApp;
