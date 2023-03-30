import React from "react";

function ChatRoom(props) {
  return (
    <>
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
    </>
  );
}

export default ChatRoom;
