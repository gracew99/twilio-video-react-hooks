import React from "react";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <div className="registerDebate">
      <Form onSubmit={handleSubmit}>
        <h2 className="pageTitle">Enter a room</h2>
          <Form.Group as={Row}>
              <Form.Label htmlFor="name" column sm={4}> Name: </Form.Label>
              <Col sm={4}>
              <Form.Control type="text" value={username} placeholder={"First Last"} onChange={handleUsernameChange} readOnly={connecting} required/> 
              </Col>
          </Form.Group>
          <Form.Group as={Row}>
              <Form.Label htmlFor="room" column sm={4}> Room Name: </Form.Label>
              <Col sm={4}>
              <Form.Control type="text" id="room" value={roomName} placeholder={"Example Room"} onChange={handleRoomNameChange} readOnly={connecting} required/> 
              </Col>
          </Form.Group>
        <button type="submit" disabled={connecting}>
          {connecting ? "Connecting" : "Join"}
        </button>
      </Form>
    </div>
  );
};

export default Lobby;
