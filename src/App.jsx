import React, { useState, useEffect } from "react";
import CanvasComponent from "./CanvasComponent";
import JoinOrHost from "./JoinOrHost";
import io from "socket.io-client";
const socket = io(
  "https://doyouknowyourfriends-env.eba-zbakckmz.us-east-1.elasticbeanstalk.com/"
);
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
  let [QAArray, setQAArray] = useState([]);
  let [correctAnswerColor, setCorrectAnswerColor] = useState();
  const words = useRandomWord();

  useEffect(() => {
    setUsername(words);
  }, []);

  return (
    <RoomProvider>
      <div className="min-h-screen bg-neutral-900 text-white">
        <div className="h-full items-center justify-center flex flex-col">
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
            socketId={socket.id}
            setQAArray={setQAArray}
            correctAnswerColor={correctAnswerColor}
            setCorrectAnswerColor={setCorrectAnswerColor}
          />
        </div>
        {foundRoom && questionsAnswered && (
          <div className="w-full flex flex-col justify-center items-center">
            {/* <img
              className="flex mx-auto h-[350px]"
              src={bannerTransparent}
              alt=""
            /> */}
            <CanvasComponent
              socketId={socket.id}
              username={username}
              isHost={isHost}
              socket={socket}
              io={io}
              roomName={roomName}
              roomSize={roomSize}
              QAArray={QAArray}
              correctAnswerColor={correctAnswerColor}
              setCorrectAnswerColor={setCorrectAnswerColor}
            />
          </div>
        )}
      </div>
    </RoomProvider>
  );
}

export default App;
