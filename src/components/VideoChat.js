import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";
import axios from '../axios'


const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  const { topicName, id } = useParams();

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);

      const url = '/v2/debates/'+id;
      const response = await axios.get(url);
      const actualPassword = response.data[0].password;
      const params = {};
      params.actual = actualPassword;
      params.attempt = password;
      const enterRoom = await axios.post('/v2/verify', params);

      if (enterRoom.data.success){
        const body = {};
        body.identity = username;
        body.room = id;
        // USE AXIOS, NOT FETCH!
        const getToken = await axios.post('/video/token', body);
  
        Video.connect(getToken.data.token, {
          name: id,
        })
          .then((room) => {
            setConnecting(false);
            setRoom(room);
          })
          .catch((err) => {
            console.error(err);
            setConnecting(false);
          });
      } else {
        setIsCorrectPassword(false);
      }

    },
    [id, username, password]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room roomName={id} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        password={password}
        isCorrectPassword={isCorrectPassword}
        id={id} 
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return render;
};

export default VideoChat;
