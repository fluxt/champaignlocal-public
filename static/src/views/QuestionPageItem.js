import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router';
import DefaultNavbar from "components/DefaultNavbar.js";
import QuestionPageHeader from "components/Headers/QuestionsPageHeader.js"

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

const Item = (props) => {
    const [item, setItem] = useState({});
    const [itemid, setItemid] = useState("");
    const [editMode, setEditMode] = useState(false);

    //item
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Comment, setComment] = useState("");
    const [routeRedirect, setRedirect] = useState("");

    const getItem = () => {
        let id = props.match.params.id;
        let cleanID = id.replace(/['"]+/g, "");
        setItemid(cleanID);
        fetch("http://localhost:5000/api/questions/item/" + cleanID)
        .then(res => {
            return res.json();
        }).then(res => {
            //parse the pymongo response to JSON
            let parsedResponse = JSON.parse(res.data);
            setItem(parsedResponse)
            //change to parsedResponse
            setTitle(parsedResponse.Title);
            setContent(parsedResponse.Content);
            setComment(parsedResponse.Comment);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItem();
    }, []);

    const editItem = (itemId) => {
        console.log(itemId)
        setEditMode(!editMode);
    }

    const updateItem = (e) => {
        e.preventDefault();
        const item = {
            itemid : itemid,
            Title: Title,
            Content: Content,
            Comment: Comment
        }
        console.log(item)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(item)
        }
        fetch("http://localhost:5000/api/questions/update/" + itemid, options)
        .then(res => {
            return res.json();
        }).then(res => {
            console.log(res)
            setRedirect(true);
        }).catch(err => {
            console.log(err)
        });
    }

    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to = "/questions/getitems" />
    }

    let editForm;
    if (editMode) {
        editForm = 
        <React.Fragment>
            <form className = "editForm" onSubmit = {updateItem}>
                <p> Add your Comment</p>
                <div className = "control">
                    <label htmlFor = "Comment">Comment: </label>
                    <input type = "text area" name = "Comment" onChange = {e => setComment(e.target.value)} />
                </div>
                <input type = "submit" value = "Update Item"/>
            </form>
        </React.Fragment>
    }

    return (
        <>
        <DefaultNavbar/>
        <QuestionPageHeader/>
        <React.Fragment>
            <div className = "single">
                <h3>Title: {item.Title}</h3>
                <h3>Content: {item.Content}</h3>
                <h3>Comments: {item.Comment}</h3>
            <button className = "edit" onClick = {(e) => editItem(itemid)}>Add Comment</button>
            </div>
            {editForm}
        </React.Fragment>
        </>
    );
}
export default Item;