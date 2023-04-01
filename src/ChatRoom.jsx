// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// function ChatRoom(props) {
//   let { roomName, socket, io, username } = props;
//   let [incMessages, setIncMessages] = useState([]);
//   let [message, setMessage] = useState("");
//   console.log("ran");
//   function sendMessage(roomName, message) {
//     if (message !== "") {
//       const data = {
//         id: uuidv4(),
//         message,
//         username: username,
//       };
//       socket.emit("chat message", data, roomName);
//       setMessage("");
//     }
//   }
//   useEffect(() => {
//     socket.on("chat message", (message) => {
//       setIncMessages((incMessages) => [
//         ...incMessages,
//         { id: uuidv4(), message: message.message, username: message.username },
//       ]);
//     });
//     // return () => {
//     //   socket.off("chat message");
//     // };
//   }, []);

//   // function handleKeyPress(event) {
//   //   if (event.key === "Enter") {
//   //     sendMessage(roomName, message);
//   //   }
//   // }

//   return (
//     <div className="mt-4">
//       <input
//         className="text-black"
//         type="text"
//         value={message}
//         onChange={(event) => setMessage(event.target.value)}
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RoomContext from "./context/RoomContext";

function ChatRoom(props) {
  const { roomMembers, addRoomMember, removeRoomMember, setRoomMembers } =
    useContext(RoomContext);
  const { roomName, socket, io, username } = props;
  const [incMessages, setIncMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  function sendMessage(roomName, message) {
    if (sendingMessage || message === "") {
      return;
    }
    setSendingMessage(true);
    const data = {
      id: uuidv4(),
      message,
      username: username,
    };
    socket.emit("chat message", data, roomName);
    setMessage("");
    setTimeout(() => {
      setSendingMessage(false);
    }, 1000);
  }

  useEffect(() => {
    // Add the current user to the room members
    addRoomMember(username);

    // Listen for room member updates
    socket.on("room members update", (members) => {
      setRoomMembers(members);
    });

    // Remove the current user from the room members when the component unmounts
    return () => {
      removeRoomMember(username);
    };
  }, []);

  useEffect(() => {
    // Listen for new chat messages
    socket.on("chat message", (message) => {
      setIncMessages((incMessages) => [
        ...incMessages,
        { id: uuidv4(), message: message.message, username: message.username },
      ]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage(roomName, message);
    }
  }

  return (
    <div className="mt-4">
      <input
        className="text-black"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        // onKeyDown={handleKeyPress}
      />
      <button onClick={() => sendMessage(roomName, message)}>Send</button>
      <ul className=" overflow-y-auto h-24">
        {incMessages.map((msg, index) => (
          <li key={index + msg.id}>
            {msg.username}: {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRoom;
