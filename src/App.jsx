import React, { useState, useEffect } from "react";
import CanvasComponent from "./CanvasComponent";
import PreGame from "./PreGame";
import JoinOrHost from "./JoinOrHost";
import Bots from "./Bots";
import bannerTransparent from "./assets/misc/BannerTransparent.png";
function App() {
  let [foundRoom, setFoundRoom] = useState(false);
  let [questionsAnswered, setQuestionsAnswered] = useState(false);
  let [isHost, setIsHost] = useState(false);
  // let [questionsAnswered, setQuestionsAnswered] = useState(false);
  return (
    <div className="h-screen overflow-hidden bg-neutral-900 text-white">
      <div className="items-center justify-center flex flex-col">
        <JoinOrHost
          foundRoom={foundRoom}
          setFoundRoom={setFoundRoom}
          questionsAnswered={questionsAnswered}
          setQuestionsAnswered={setQuestionsAnswered}
          isHost={isHost}
          setIsHost={setIsHost}
        />
      </div>
      {foundRoom && questionsAnswered && (
        <div className="w-full flex flex-col justify-center items-center">
          <img
            className="flex mx-auto h-[350px]"
            src={bannerTransparent}
            alt=""
          />
          <CanvasComponent />
        </div>
      )}
    </div>
  );
}

export default App;
