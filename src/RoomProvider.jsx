import React, { useState } from "react";
import RoomContext from "./context/RoomContext";

function RoomProvider(props) {
  const [roomMembers, setRoomMembers] = useState([]);

  function addRoomMember(member) {
    setRoomMembers((prevMembers) => [...prevMembers, member]);
  }

  function removeRoomMember(member) {
    setRoomMembers((prevMembers) => prevMembers.filter((m) => m !== member));
  }

  return (
    <RoomContext.Provider
      value={{ roomMembers, addRoomMember, removeRoomMember, setRoomMembers }}
      {...props}
    />
  );
}

export default RoomProvider;
