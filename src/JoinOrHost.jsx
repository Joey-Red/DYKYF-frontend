import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
import { v4 as uuidv4 } from "uuid";
import bannerTransparent from "./assets/misc/BannerTransparent.png";
import PreGame from "./PreGame";
import Bots from "./Bots";
function JoinOrHost(props) {
  const [players, setPlayers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [manualJoin, setManualJoin] = useState("");
  const [message, setMessage] = useState("");
  const [incMessages, setIncMessages] = useState([]);
  let { foundRoom, setFoundRoom, questionsAnswered, setQuestionsAnswered } =
    props;
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
    setFoundRoom(true);
  }

  function handleJoinRoom(roomName) {
    setRoomName(roomName);
    socket.emit("join room", roomName);
    setFoundRoom(true);
  }

  return (
    <div className="">
      <div className="flex flex-col items-center">
        {!foundRoom && (
          <img
            className="flex mx-auto max-h-[350px]"
            src={bannerTransparent}
            alt=""
          />
        )}
        {foundRoom && questionsAnswered ? (
          <></>
        ) : (
          <div className="flex flex-col border-2 border-white p-4 rounded m-4 w-[500px]">
            {foundRoom === true && questionsAnswered === false ? (
              <div className="w-full flex flex-col justify-center items-center">
                <PreGame roomName={roomName} />
              </div>
            ) : (
              <>
                <form
                  className="flex flex-col"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <label>
                    <p>Create a new room:</p>
                    <input
                      className="rounded text-black"
                      placeholder="Friends4Life"
                      type="text"
                      value={roomName}
                      onChange={(event) => setRoomName(event.target.value)}
                    />
                    <button
                      className="p-2 border-white"
                      onClick={handleCreateRoom}
                    >
                      Create
                    </button>
                  </label>
                </form>
                <ul>
                  <li>
                    <label>
                      <p>Join a room:</p>
                      <input
                        className="rounded text-black"
                        placeholder="Hurry up and send the code dude"
                        type="text"
                        value={manualJoin}
                        onChange={(event) => setManualJoin(event.target.value)}
                      />
                      <button
                        className="p-2 border-white"
                        onClick={() => handleJoinRoom(manualJoin)}
                      >
                        Join
                      </button>
                    </label>
                  </li>

                  {/* <li>
                <button className="p-2 border-white" onClick={() => handleJoinRoom("default")}>
                  Default
                </button>
              </li>
              <li>
                <button className="p-2 border-white" onClick={() => handleJoinRoom("room1")}>Room 1</button>
              </li>
              <li>
                <button className="p-2 border-white" onClick={() => handleJoinRoom("room2")}>Room 2</button>
              </li> */}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
      {foundRoom === false || questionsAnswered === false ? <Bots /> : <></>}
    </div>
  );
}

export default JoinOrHost;
