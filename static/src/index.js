import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
// pages
import IndexPage from "views/IndexPage.js";

import RegisterPage from "views/users/UsersRegisterPage.js";
import LoginPage from "views/users/UsersLoginPage.js";
import UpdatePage from "views/users/UsersUpdatePage.js";
import DeletePage from "views/users/UsersDeletePage.js";

import StoresPage from "views/stores/StoresPage.js";

import QuestionPage from "views/QuestionsPage.js"
import Main from "views/QuestionPageMain.js";
import Item from "views/QuestionPageItem.js";
// others

import { ProvideAuth, RouteWithAuth } from "utils/auth.js"

ReactDOM.render(
  <ProvideAuth>
    <Router>
      <Switch>
        <Route
          exact path="/"
          render={(props) => <IndexPage {...props} />}
        />
        <Route
          path="/users/register"
          render={(props) => <RegisterPage {...props} />}
          exact path = "/questions"
          render = {(props) => <QuestionPage {...props} />}
        />
        <Route 
          exact path = "/questions/getitems"
          render = {(props) => <Main {...props} />}
        />
        <Route 
        path = "/questions/item/:id"
        render = {(props) => <Item {...props} /> }
        />
        <Route
          path="/users/login"
          render={(props) => <LoginPage {...props} />}
        />
        <RouteWithAuth
          path="/users/update"
          render={(props) => <UpdatePage {...props} />}
        />
        <RouteWithAuth
          path="/users/delete"
          render={(props) => <DeletePage {...props} />}
        />
        <Route
          path="/stores"
          render={(props) => <StoresPage {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  </ProvideAuth>,
  document.getElementById("root")
);