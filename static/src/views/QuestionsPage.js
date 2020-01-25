import React, {useEffect, useState} from "react";
import DefaultNavbar from "components/DefaultNavbar";
import {Redirect} from 'react-router';
import QuestionPageHeader from "components/Headers/QuestionsPageHeader";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
} from "reactstrap";

const QuestionPage = () => {
  const [DiscussionTitle, setTitle] = useState("");
  const [DiscussionContent, setContent] = useState("");
  const [DiscussionComment, setComment] = useState("");
  const [routeRedirect, setRedirect] = useState("");

const createQuestion = (e) => {
  e.preventDefault();
  console.log("data")

  const item = {
    Title : DiscussionTitle,
    Content: DiscussionContent,
    Comment: [
      DiscussionComment
    ]
  }

  const options = {
    method: 'post',
    headers: {
    "Content-Type": "application/json"
    },
      body: JSON.stringify(item)
  }

  if(DiscussionTitle && DiscussionContent){
    fetch("http://localhost:5000/api/questions", options)
    .then( res => {
      return res.json()
    }).catch(err => {
      console.log(err)
    })
  }
  else {
    console.log("The form is not valid to be sent")
  }
  setRedirect(true);
}

const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to = "/questions/getitems" />
    }

  return(
    <>
    <DefaultNavbar/>
    <QuestionPageHeader/>
    <React.Fragment>
      <form className = "QuestionPage" onSubmit = {createQuestion}>
      <div className="owner">
          <div className="name">
              <h2 className="title">
                  Ask a Question! <br />
              </h2>
          </div>
      </div>
      <Row>
        <Col className = "ml-auto mr-auto" md="6">
          <label htmlFor = 'ID'>Question Title</label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-single-02" />
                </InputGroupText>
              </InputGroupAddon>
                <Input placeholder="Title" type="text" name="Title" onChange = {e => setTitle(e.target.value)} />
            </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col className = "ml-auto mr-auto" md="6">
          <label htmlFor = 'ID'>Discussion Question</label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-single-02" />
                </InputGroupText>
              </InputGroupAddon>
                <Input placeholder="Content" type="text" name="Content" onChange = {e => setContent(e.target.value)} />
            </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col className = "ml-auto mr-auto" md="6">
            <InputGroup>
              <input type = "submit" value = "create post" />
            </InputGroup>
        </Col>
      </Row>
      </form>
      <Col className = "ml-auto mr-auto" md = "6">
      <Button
                  className="btn-round"
                  color="info"
                  href="/questions/getitems"
                  target = "blank"
                >
                All Questions listed
      </Button>
      </Col>
    </React.Fragment>
    </>
  )

}
export default QuestionPage;

























































/*import DefaultNavbar from "components/DefaultNavbar";
import QuestionPageHeader from "components/Headers/QuestionsPageHeader";
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      stores: []
    };
  }

  createItem = (event) => {
    event.prevantDefault();
    console.log("data")
  }
  handleOnInput = (event) => {
    const query = event.target.value;
    this.setState({ query });
  };

  handleSearchClick = async (event) => {
    const query = this.state.query;
    console.log(query);
    const response = await fetch(
      `/api/questions/search-question?keyword=${query}`
    );
    const body = await response.json();
    if (body.ok) {
      const stores = body.stores;
      console.log(stores);
      this.setState({ stores });
    }
  };

  render() {
    return (
      <>
      <QuestionPageHeader/>
      <DefaultNavbar/>
        <div className="section content">
          <Container>
            <div className="owner">
              <div className="name">
                <h2 className="title">
                  Search a Question! <br />
                </h2>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  Type in any of these question categories : "Food", "Clothes", "Entertainment", "Automotive", etc.
                  and the questions will pop up with the given responses!
                  If a response isn't shown then simply type the question id below and leave a comment. 
                </p>
                <br />
                <>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-zoom-split"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Search"
                      onInput={this.handleOnInput}
                    />
                  </InputGroup>
                </>
                <br />
                <Button
                  className="btn-round"
                  color="default"
                  outline
                  onClick={this.createItem}
                >
                  Go!
                </Button>
              </Col>
            </Row>
            <br />
            <Row style={{ margin: "auto", justifyContent: "center" }}>
              {
                this.state.stores.map((store) => {
                  return (
                    <Card style={{ width: "30rem" }}>
                      <CardBody>
                        {/* <CardImg top src={this.state.testImage} alt="..." /> */
                        /*<CardTitle>{store.discussion_title}</CardTitle>
                        <CardText>Content: {store.discussion_content}</CardText>
                        {//<CardText>Covid Restrictions: {questions.covid_restrictions}</CardText>
                        //<CardText>Hours: {questions.hours}</CardText>
                        //<CardText>Store Location: {questions.location}</CardText>
                        //<CardText>Store Owner: {questions.owner}</CardText>
                        //<CardText>ratings: {questions.ratings}</CardText>
                        /* <Button
                          style={{
                            backgroundColor: "navajowhite",
                            borderColor: "darkslategray",
                            color: "darkslategray",
                          }}
                        >
                          {store.id}
                        </Button> */
                     {/* </CardBody>
                    </Card>
                  )
                })
              }
            </Row>
          </Container>
        </div>
    <div className="section landing-section">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <h2 className="text-center">Adding Comment</h2>
              <Row>
                <Col className = "ml-auto mr-auto" md="6">
                  <label>Discussion ID</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Discussion ID" type="text" name="updateID" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col className = "ml-auto mr-auto" md="8">
                  <label>Comment Content</label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Comment away!" type="textarea" rows = "4" name="updateName"/>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col className="ml-auto mr-auto" md="4">
                  <Button className="btn-fill" color="danger" size="lg">
                    Add Comment 
                  </Button>
                </Col>
              </Row>
          </Col>
        </Row>
      </Container>
    </div>

      </>
    );
  }
}

export default QuestionPage;
*/}
