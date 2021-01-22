import React, { useState } from 'react'
import axios from '../axios'
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

function DebateCreation() {

    const [name1, setName1]= useState("");
    const [name2, setName2]= useState("");
    const [title, setTitle]= useState("");
    const [topics, setTopics]= useState([])
    const [imgUrl, setImgUrl]= useState("");
    const [date, setDate]= useState("");
    const [image1, setImage1]= useState("");
    const [image2, setImage2]= useState("");
    const [descrip1, setDescrip1]= useState("");
    const [descrip2, setDescrip2]= useState("");
    let history = useHistory();


    async function handleSubmit() {
        const topicsArray = topics.split(", ")
        const params = {
            person1: name1,
            person2: name2,  
            title: title, 
            topics: topicsArray,
            imageUrl: imgUrl, 
            date: date,
            attendees: 0, 
            person1img: image1, 
            person2img: image2,  
            person1description: descrip1,  
            person2description: descrip2, 
        }
        history.push('/');
        const response = await axios.post('/v2/posts', params);
        setTopics(response.data);
        return response;
    }

    return (
        <div className="registerDebate">
            <h1 className="pageTitle"> Register a New Debate!</h1> <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Debater 1 Name: 
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={name1} placeholder={"First Last"} onChange={(e) => setName1(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Debater 2 Name:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={name2} placeholder={"First Last"} onChange={(e) => setName2(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Debate Title:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={title} placeholder={"Title"} onChange={(e) => setTitle(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Debate Topics 
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={topics} placeholder={"Topic1, Topic2, Topic3"} onChange={(e) => setTopics(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Link to Cover Image:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={imgUrl} placeholder={"URL"} onChange={(e) => setImgUrl(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Date:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={date} placeholder={"1/1/2021"} onChange={(e) => setDate(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Link to Debater 1 Photo:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={image1} placeholder={"URL"} onChange={(e) => setImage1(e.target.value)} /> 
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Link to Debater 2 Photo:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control type="text" value={image2} placeholder={"URL"} onChange={(e) => setImage2(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Debater 1 Description:
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control as="textarea" rows={3} value={descrip1} placeholder={"Lorem ipsum"} onChange={(e) => setDescrip1(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                    Debater 2 Description: 
                    </Form.Label>
                    <Col sm={4}>
                    <Form.Control as="textarea" rows={3} value={descrip2} placeholder={"Lorem ipsum"} onChange={(e) => setDescrip2(e.target.value)} />
                    </Col>
                </Form.Group>

                <input className="submit" type="submit" value="Submit" />
            </Form>
        </div>
    )
}

export default DebateCreation
