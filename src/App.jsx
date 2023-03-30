import React, { useState, useEffect } from "react";
import CanvasComponent from "./CanvasComponent";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
import { v4 as uuidv4 } from "uuid";
import Questions from "./Questions";
import axios from "axios";
function App() {
  const [players, setPlayers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [manualJoin, setManualJoin] = useState("");
  const [message, setMessage] = useState("");
  const [incMessages, setIncMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
      socket.emit("new player");
    });
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
    socket.on("chat message", (message) => {
      setIncMessages((incMessages) => [
        ...incMessages,
        { id: uuidv4(), message },
      ]);

      // console.log(incMessages);
    });
    socket.on("players", (players) => {
      setPlayers(players);
    });
  }, []);
  useEffect(() => {
    socket.on("chat message", (message) => {
      console.log("FIRE");
      setIncMessages((incMessages) => [...incMessages, message]);
    });
  }, []);

  function sendMessage(roomName, message) {
    if (message !== "") {
      setIncMessages((incMessages) => [
        ...incMessages,
        { id: uuidv4(), message },
      ]);
      socket.emit("chat message", message, roomName);
      setMessage("");
    }
  }

  function handleCreateRoom() {
    socket.emit("create room", roomName);
  }

  function handleJoinRoom(roomName) {
    setRoomName(roomName);
    socket.emit("join room", roomName);
  }

  // useEffect(() => {
  //   console.log(incMessages);
  // }, [incMessages]);
  let getQuestion = () => {
    axios
      .get("http://localhost:3001/get-question")
      .then((res) => {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div className="h-screen overflow-hidden bg-neutral-800 text-white">
      <div className="items-center justify-center flex flex-col">
        <h1>Multiplayer Game</h1>
        {roomName === "" && (
          <>
            <form onSubmit={(event) => event.preventDefault()}>
              <label>
                Create a new room:
                <input
                  type="text"
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                />
              </label>
              <button onClick={handleCreateRoom}>Create</button>
            </form>
            <h2>Join a room:</h2>
            <ul>
              <li>
                <label>
                  Join a room:
                  <input
                    type="text"
                    value={manualJoin}
                    onChange={(event) => setManualJoin(event.target.value)}
                  />
                </label>
                <button onClick={() => handleJoinRoom(manualJoin)}>Join</button>
              </li>
              <li>
                <button onClick={() => handleJoinRoom("default")}>
                  Default
                </button>
              </li>
              <li>
                <button onClick={() => handleJoinRoom("room1")}>Room 1</button>
              </li>
              <li>
                <button onClick={() => handleJoinRoom("room2")}>Room 2</button>
              </li>
            </ul>
          </>
        )}
        {/* <h2>Players:</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.id}</li>
        ))}
      </ul> */}
        <h2>Inc Messages:</h2>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={() => sendMessage(roomName, message)}>Send</button>
        <ul>
          {incMessages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-neutral-900 rounded-t-xl p-2 justify-self-center w-[1000px]">
          <button
            className="border-white rounded-xl p-2 border-2"
            onClick={() => getQuestion()}
          >
            Get question
          </button>
        </div>
        <CanvasComponent />
      </div>
    </div>
  );
}

export default App;
