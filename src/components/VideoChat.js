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
      console.log(response.data[0].password)
      console.log(password)
      if (response.data[0].password===password){
        const data = await fetch("/video/token", {
          method: "POST",
          body: JSON.stringify({
            identity: username,
            room: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        Video.connect(data.token, {
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
