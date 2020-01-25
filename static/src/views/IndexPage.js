import React from "react";
import { Progress } from "reactstrap";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DefaultNavbar from "components/DefaultNavbar.js";
import DefaultFooter from "components/DefaultFooter.js";
import PageHeader from "components/Headers/PageHeader.js"

// images
import indexPageBackground from "assets/img/daniel-olahh.jpg";

import avatar1 from "assets/img/faces/clem-onojeghuo-3.jpg";
import avatar2 from "assets/img/faces/joe-gardner-2.jpg";
import avatar3 from "assets/img/faces/erik-lucatero-2.jpg";

function IndexPage() {
  return (
    <>
      <DefaultNavbar />
      <PageHeader backgroundImage={indexPageBackground} />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">What is ChampaignLocal?</h2>
                <h5 className="description">
                  We are a group of students dedicated to bringing more consumer awarness to the local 
                  buisnesses of the Champaign-Urbana area. Many people desire to want to give back to their
                  local communities but are unsure on where to start. We are here to make that search easier 
                  for you! Just simply search by a store name or category and we will display the stores that match
                  your needs!
                </h5>
                <br />
              </Col>
            </Row>
          </Container>
      <Container>
        <Col className = "ml-auto mr-auto" md = "8">
          <h2 className = "title">Average Best Prices for Delievery Overall</h2>
        </Col>
      <div className="progress-container progress-primary">
        <span className="progress-badge">Uber Eats</span>
        <Progress
          max="10"
          value="3"
          barClassName="progress-bar-primary"
        />
      </div>
      <div className="progress-container progress-danger">
        <span className="progress-badge">Door Dash</span>
        <Progress max="10" value="5" barClassName="progress-bar-danger" />
      </div>
      <div className="progress-container progress-warning">
        <span className="progress-badge">Grub Hub</span>
        <Progress
          max="10"
          value="5"
          barClassName="progress-bar-warning"
        />
      </div>
      </Container>
        </div>
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Meet the Creators</h2>
            <Row>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        src={avatar1}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Apoorva Josyula</CardTitle>
                        <h6 className="card-category">Frontend Designer</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      Teamwork is so important that it is virtually impossible
                      for you to reach the heights of your capabilities or make
                      the money that you want without becoming very good at it.
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        src={avatar2}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Rohan Kanianchalil</CardTitle>
                        <h6 className="card-category">Database Designer</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      A group becomes a team when each member is sure enough of
                      himself and his contribution to praise the skill of the
                      others. No one can whistle a symphony. It takes an
                      orchestra to play it.
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="card-avatar">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        src={avatar3}
                      />
                    </a>
                  </div>
                  <CardBody>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <div className="author">
                        <CardTitle tag="h4">Henry Choi</CardTitle>
                        <h6 className="card-category">Backend Designer</h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      The strength of the team is each individual member. The
                      strength of each member is the team. If you can laugh
                      together, you can work together, silence isn’t golden,
                      it’s deadly.
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
}

export default IndexPage;
