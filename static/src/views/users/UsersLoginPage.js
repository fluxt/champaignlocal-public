import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledPopover, PopoverBody } from "reactstrap";

// core components
import DefaultNavbar from "components/DefaultNavbar.js";

// images
import loginPageBackground from "assets/img/login-image.jpg";

import { useHistory, useLocation } from "react-router";
import { useAuth } from "utils/auth.js";

function LoginPage() {
  const history = useHistory();
  const auth = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.elements.username.value;
    const password = target.elements.password.value;

    let success = false;
    try {
      success = await auth.login(username, password);
    } catch (e) {
      console.log(e);
    }
    if (success) {
      history.replace(from);
    }
  }

  return (
    <>
      <DefaultNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: `url(${loginPageBackground})`,
        }}
      >
        <div className="filter" />
        <Container style={{"marginTop": "unset"}}>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                <Form className="register-form" onSubmit={handleLoginSubmit}>
                  <label>Username</label>
                  <Input placeholder="Username" type="text" name="username"/>
                  <label>Password</label>
                  <Input placeholder="Password" type="password" name="password"/>
                  <Button block className="btn-round" color="danger" id="submit">
                    Log In
                  </Button>
                  <UncontrolledPopover trigger="focus" placement="right" target="submit">
                    <PopoverBody>Login Error. Try Again!</PopoverBody>
                  </UncontrolledPopover>
                  <Button block
                      className="btn-link"
                      color="danger"
                      href="/users/register"
                    >
                      New User?
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
