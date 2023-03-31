import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ChatRoom(props) {
  let { roomName, socket, io } = props;
  let [incMessages, setIncMessages] = useState([]);
  let [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("chat message", (message) => {
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

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage(roomName, message);
    }
  }

  useEffect(() => {
    socket.on("chat message", (message) => {
      setIncMessages((incMessages) => [
        ...incMessages,
        { id: uuidv4(), message },
      ]);
    });
  }, []);

  useEffect(() => {
    console.log(incMessages);
  }, [incMessages]);

  return (
    <div className="mt-4">
      <input
        className="text-black"
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => sendMessage(roomName, message)}>Send</button>
      <ul className=" overflow-y-auto h-24">
        {incMessages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoom;
