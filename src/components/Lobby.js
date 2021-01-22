import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import axios from '../axios'

const Lobby = ({
  username,
  password,
  isCorrectPassword,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  connecting,
  id
}) => {

  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getDebateDetails(){  
      const url = '/v2/debates/'+id;
      const response = await axios.get(url);
      setTitle(response.data[0].title)
      return response;
    }
    getDebateDetails()
  
  }, []);

  return (
    <div className="registerDebate">
      <Form onSubmit={handleSubmit}>
        <h2 className="pageTitle">Enter Room: {title}</h2>
          <Form.Group as={Row}>
              <Form.Label htmlFor="name" column sm={4}> Name: </Form.Label>
              <Col sm={4}>
              <Form.Control type="text" value={username} placeholder={"First Last"} onChange={handleUsernameChange} readOnly={isCorrectPassword && connecting} required/> 
              </Col>
          </Form.Group>
          <Form.Group as={Row}>
              <Form.Label htmlFor="room" column sm={4}> Room Password: </Form.Label>
              <Col sm={4}>
              <Form.Control type="text" value={password} placeholder={"password"} onChange={handlePasswordChange} readOnly={isCorrectPassword && connecting} required/> 
              </Col>
          </Form.Group>
        <button type="submit" disabled={isCorrectPassword && connecting}>
          {(isCorrectPassword && connecting) ? "Connecting" : "Join"}
        </button>
        {!isCorrectPassword && <Form.Group as={Row}>
              <Form.Label htmlFor="room" column sm={4}> Wrong Password </Form.Label>
          </Form.Group>}
      </Form>
    </div>
  );
};

export default Lobby;
