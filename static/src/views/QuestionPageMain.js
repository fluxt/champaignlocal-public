import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DefaultNavbar from "components/DefaultNavbar";
import QuestionPageHeader from "components/Headers/QuestionsPageHeader";


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

const Main = () => {
    const [items, setItems] = useState([]);
    const getItems = () => {
        fetch("http://localhost:5000/api/questions/getitems")
        .then(res => {
            return res.json();
        }).then(items => {
            console.log(items);
            setItems(items.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItems();
    }, [])

    let itemsArray;
    if(items.length > 0){
        itemsArray = <div className = "items">
            {items.map(item => {
                return(
                <Card style = {{width: "30rem"}}>
                    <Link to={"/questions/item/" + item._id}>
                    <CardBody>
                        <CardTitle>{item.Title}</CardTitle>
                        <CardText>Question Content: {item.Content} </CardText>
                        <CardText>Comments: {item.Comment.map(s => (<li>{s}</li>))}</CardText>
                    </CardBody>
                    </Link>
                </Card>
                )
            })}
        </div>


    } else{
        itemsArray = <div className = "message">
        <p>No items in database</p>
        </div>
        
    }

    return (
        <React.Fragment>
            <DefaultNavbar/>
            <QuestionPageHeader/>
            <div className="owner">
                <div className="name">
                    <h2 className="title">
                        Asked Questions <br />
                    </h2>
                </div>
            </div>
                <p>All Questions that have been asked so far!</p>
            {itemsArray}
        </React.Fragment>
    )
}

export default Main;