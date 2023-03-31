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
  // const [manualJoin, setManualJoin] = useState("");
  const [roomTakenErr, setRoomTakenErr] = useState(false);
  const [roomDoesntExistErr, setRoomDoesntExistErr] = useState(false);
  let {
    foundRoom,
    setFoundRoom,
    questionsAnswered,
    setQuestionsAnswered,
    isHost,
    setIsHost,
  } = props;
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
      socket.emit("new player");
    });
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    socket.on("players", (players) => {
      setPlayers(players);
    });
    socket.on("roomCreated", (data) => {
      setFoundRoom(true);
      setIsHost(true);
    });
    socket.on("roomNameTaken", (data) => {
      console.log(data.error);
      setRoomTakenErr(true);
    });
    socket.on("joinedRoomFail", (data) => {
      setRoomDoesntExistErr(true);
    });
    socket.on("joinedRoomSuccess", (data) => {
      setFoundRoom(true);
    });
  }, []);

  useEffect(() => {
    console.log(players);
  }, [players]);

  useEffect(() => {
    let timer;
    if (roomTakenErr) {
      timer = setTimeout(() => {
        setRoomTakenErr(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [roomTakenErr]);
  useEffect(() => {
    let timer;
    if (roomDoesntExistErr) {
      timer = setTimeout(() => {
        setRoomDoesntExistErr(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [roomDoesntExistErr]);
  function handleCreateRoom() {
    socket.emit("create room", roomName);
    // setFoundRoom(true);
  }

  function handleJoinRoom(roomName) {
    socket.emit("join room", roomName);
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
                <PreGame
                  socket={socket}
                  io={io}
                  isHost={isHost}
                  setQuestionsAnswered={setQuestionsAnswered}
                  roomName={roomName}
                />
              </div>
            ) : (
              <>
                <form
                  className="flex flex-col"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <label>
                    <p>Create a new room:</p>
                    {roomTakenErr && (
                      <p className="text-red-500 font-bold">Room name taken</p>
                    )}
                    <input
                      className="rounded text-black"
                      placeholder="Friends4Life"
                      type="text"
                      // value={roomName}
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
                      {roomDoesntExistErr && (
                        <p className="text-red-500">This room doesn't exist.</p>
                      )}
                      <input
                        className="rounded text-black"
                        placeholder="Hurry up and send the code dude"
                        type="text"
                        // value={roomName}
                        onChange={(event) => setRoomName(event.target.value)}
                      />
                      <button
                        className="p-2 border-white"
                        onClick={() => handleJoinRoom(roomName)}
                      >
                        Join
                      </button>
                    </label>
                  </li>
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
