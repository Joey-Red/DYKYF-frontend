import React, { useState, useEffect } from "react";
import CanvasComponent from "./CanvasComponent";
import PreGame from "./PreGame";
import JoinOrHost from "./JoinOrHost";
import Bots from "./Bots";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
import bannerTransparent from "./assets/misc/BannerTransparent.png";
import useRandomWord from "./useRandomWord";
import RoomProvider from "./RoomProvider";
function App() {
  let [foundRoom, setFoundRoom] = useState(false);
  let [questionsAnswered, setQuestionsAnswered] = useState(false);
  let [isHost, setIsHost] = useState(false);
  let [username, setUsername] = useState("");
  let [roomName, setRoomName] = useState("");
  let [roomSize, setRoomSize] = useState();
  const words = useRandomWord();

  useEffect(() => {
    setUsername(words);
  }, []);
  // useEffect(() => {
  //   console.log(words);
  // }, []);

  return (
    <RoomProvider>
      <div className="h-screen overflow-hidden bg-neutral-900 text-white">
        <div className="items-center justify-center flex flex-col">
          <JoinOrHost
            foundRoom={foundRoom}
            setFoundRoom={setFoundRoom}
            questionsAnswered={questionsAnswered}
            setQuestionsAnswered={setQuestionsAnswered}
            isHost={isHost}
            setIsHost={setIsHost}
            username={username}
            socket={socket}
            roomName={roomName}
            setRoomName={setRoomName}
            io={io}
            setRoomSize={setRoomSize}
            roomSize={roomSize}
          />
        </div>
        {foundRoom && questionsAnswered && (
          <div className="w-full flex flex-col justify-center items-center">
            <img
              className="flex mx-auto h-[350px]"
              src={bannerTransparent}
              alt=""
            />
            <CanvasComponent
              username={username}
              isHost={isHost}
              socket={socket}
              io={io}
              roomName={roomName}
              roomSize={roomSize}
            />
          </div>
        )}
      </div>
    </RoomProvider>
  );
}

export default App;
