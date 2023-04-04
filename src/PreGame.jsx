import React, { useState, useEffect } from "react";
import axios from "axios";
import bannerTransparent from "./assets/misc/BannerTransparent.png";
import LoadingSpinner from "./assets/misc/LoadingSpinner";
import ChatRoom from "./ChatRoom";

function PreGame(props) {
  let [questions, setQuestions] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [answerOne, setAnswerOne] = useState("");
  let [answerTwo, setAnswerTwo] = useState("");
  let [answerThree, setAnswerThree] = useState("");
  let [answersSubmitted, setAnswersSubmitted] = useState(false);
  let [buttonDisabled, setButtonDisabled] = useState(true);
  let [clickedOneA, setClickedOneA] = useState(false);
  let [clickedOneB, setClickedOneB] = useState(false);
  let [clickedOneC, setClickedOneC] = useState(false);
  let [clickedTwoA, setClickedTwoA] = useState(false);
  let [clickedTwoB, setClickedTwoB] = useState(false);
  let [clickedTwoC, setClickedTwoC] = useState(false);
  let [clickedThreeA, setClickedThreeA] = useState(false);
  let [clickedThreeB, setClickedThreeB] = useState(false);
  let [clickedThreeC, setClickedThreeC] = useState(false);
  let [dOne, setDOne] = useState(false);
  let [dTwo, setDTwo] = useState(false);
  let [dThree, setDThree] = useState(false);
  let [players, setPlayers] = useState([]);
  // let [customUsername, setCustomUsername] = useState("Anon");
  let [allPlayersReady, setAllPlayersReady] = useState(false);
  let {
    roomName,
    isHost,
    setQuestionsAnswered,
    socket,
    io,
    username,
    roomSize,
    setRoomSize,
    setQAArray,
  } = props;
  useEffect(() => {
    axios
      .get("http://localhost:3001/get-questions")
      .then((res) => {
        setQuestions(res.data);
        setLoaded(true);
        // console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
      socket.emit("new player");
    });
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
    socket.on("playersWhoSubmittedAnswers", (data) => {
      console.log(data);
    });
    socket.on("players", (players) => {
      setPlayers(players);
    });
    socket.on("allPlayersReady", (data) => {
      setAllPlayersReady(true);
      setQAArray(data);
    });
    socket.on("start game", (data) => {
      setRoomSize(data.roomSize);
      setQuestionsAnswered(true);
    });
  }, []);

  let doneAnswering = () => {
    socket.emit("submitAnswers", {
      roomName: roomName,
      socketId: socket.id,
      username: username,
      questionOne: questions[0],
      answerOne: answerOne,
      questionTwo: questions[1],
      answerTwo: answerTwo,
      questionThree: questions[2],
      answerThree: answerThree,
    });
    setAnswersSubmitted(true);
  };

  useEffect(() => {
    if (
      answerOne === null ||
      answerOne === undefined ||
      answerTwo === null ||
      answerTwo === undefined ||
      answerThree === null ||
      answerThree === undefined ||
      answersSubmitted === true
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [answerOne, answerTwo, answerThree]);
  let startGame = () => {
    let data = {
      roomName: roomName,
      socketId: socket.id,
      // username: customUsername,
      questionOne: questions[0],
      answerOne: answerOne,
      questionTwo: questions[1],
      answerTwo: answerTwo,
      questionsThree: questions[2],
      answerThree: answerThree,
    };
    socket.emit("all players ready", data);
  };
  return (
    <div>
      {answersSubmitted && (
        <img
          src={bannerTransparent}
          className="h-[200px] flex mx-auto"
          alt=""
        />
      )}
      {!loaded && (
        <div className="flex justify-evenly gap-4 w-full">
          <div className="flex flex-col">
            <p>Loading..</p>
            <ul className="flex text-left items-start flex-col">
              <li>a) Loading..</li>
              <li>b) Loading.. </li>
              <li>c) Loading..</li>
              <li>d) Loading..</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p>Loading..</p>
            <ul className="flex text-left items-start flex-col">
              <li>a) Loading..</li>
              <li>b) Loading.. </li>
              <li>c) Loading..</li>
              <li>d) Loading..</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p>Loading..</p>
            <ul className="flex text-left items-start flex-col">
              <li>a) Loading..</li>
              <li>b) Loading.. </li>
              <li>c) Loading..</li>
              <li>d) Loading..</li>
            </ul>
          </div>
        </div>
      )}
      {loaded && !answersSubmitted && (
        <div className="">
          <div className="flex justify-evenly gap-4 w-full">
            <div className="flex flex-col">
              <p>{questions[0].question}</p>
              <ul className="flex text-left items-start flex-col">
                <button
                  className={
                    clickedOneA ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerOne(questions[0].a);
                    setClickedOneA(true);
                    setClickedOneB(false);
                    setClickedOneC(false);
                    setDOne(false);
                  }}
                >
                  a) {questions[0].a}
                </button>
                <button
                  className={
                    clickedOneB ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerOne(questions[0].b);
                    setClickedOneB(true);
                    setClickedOneA(false);
                    setClickedOneC(false);
                    setDOne(false);
                  }}
                >
                  b) {questions[0].b}
                </button>
                <button
                  className={
                    clickedOneC ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerOne(questions[0].c);
                    setClickedOneC(true);
                    setClickedOneB(false);
                    setClickedOneA(false);
                    setDOne(false);
                  }}
                >
                  c) {questions[0].c}
                </button>
                <li className="flex">
                  <p className={dOne ? "text-red-500" : "text-white"}>d) </p>
                  <input
                    type="text"
                    placeholder="Answer"
                    className={
                      dOne
                        ? "rounded w-full ml-1 text-red-900"
                        : "rounded w-full ml-1 text-black"
                    }
                    onChange={(e) => {
                      setAnswerOne(e.target.value);
                      setDOne(true);
                      setClickedOneC(false);
                      setClickedOneB(false);
                      setClickedOneA(false);
                    }}
                  />
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <p>{questions[1].question}</p>
              <ul className="flex text-left items-start flex-col">
                <button
                  className={
                    clickedTwoA ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerTwo(questions[1].a);
                    setClickedTwoA(true);
                    setClickedTwoB(false);
                    setClickedTwoC(false);
                    setDTwo(false);
                  }}
                >
                  a) {questions[1].a}
                </button>
                <button
                  className={
                    clickedTwoB ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerTwo(questions[1].b);
                    setClickedTwoB(true);
                    setClickedTwoA(false);
                    setClickedTwoC(false);
                    setDTwo(false);
                  }}
                >
                  b) {questions[1].b}
                </button>
                <button
                  className={
                    clickedTwoC ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerTwo(questions[1].c);
                    setClickedTwoC(true);
                    setClickedTwoB(false);
                    setClickedTwoA(false);
                    setDTwo(false);
                  }}
                >
                  c) {questions[1].c}
                </button>
                <li className="flex">
                  <p className={dTwo ? "text-red-500" : "text-white"}>d) </p>
                  <input
                    type="text"
                    placeholder="Answer"
                    className={
                      dTwo
                        ? "rounded w-full ml-1 text-red-900"
                        : "rounded w-full ml-1 text-black"
                    }
                    onChange={(e) => {
                      setAnswerTwo(e.target.value);
                      setDTwo(true);
                      setClickedTwoC(false);
                      setClickedTwoB(false);
                      setClickedTwoA(false);
                    }}
                  />
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <p>{questions[2].question}</p>
              <ul className="flex text-left items-start flex-col">
                <button
                  className={
                    clickedThreeA ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerThree(questions[2].a);
                    setClickedThreeA(true);
                    setClickedThreeB(false);
                    setClickedThreeC(false);
                    setDThree(false);
                  }}
                >
                  a) {questions[2].a}
                </button>
                <button
                  className={
                    clickedThreeB ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerThree(questions[2].b);
                    setClickedThreeB(true);
                    setClickedThreeA(false);
                    setClickedThreeC(false);
                    setDThree(false);
                  }}
                >
                  b) {questions[2].b}
                </button>
                <button
                  className={
                    clickedThreeC ? "text-start text-red-500" : "text-start"
                  }
                  onClick={() => {
                    setAnswerThree(questions[2].c);
                    setClickedThreeC(true);
                    setClickedThreeB(false);
                    setClickedThreeA(false);
                    setDThree(false);
                  }}
                >
                  c) {questions[2].c}
                </button>
                <li className="flex">
                  <p className={dThree ? "text-red-500" : "text-white"}>d)</p>
                  <input
                    type="text"
                    placeholder="Answer"
                    className={
                      dThree
                        ? "rounded w-full ml-1 text-red-900"
                        : "rounded w-full ml-1 text-black"
                    }
                    onChange={(e) => {
                      setAnswerThree(e.target.value);
                      setDThree(true);
                      setClickedThreeC(false);
                      setClickedThreeB(false);
                      setClickedThreeA(false);
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
          <button
            // disabled={buttonDisabled}
            // onClick={() => doneAnswering()}
            onClick={() => doneAnswering()}
            className="mt-4 p-2 mx-auto w-full rounded bg-[#FF0000] font-bold border-black border-4 text-black text-2xl"
          >
            I'm done.
          </button>
        </div>
      )}
      {answersSubmitted && !isHost && !allPlayersReady && (
        <div className="pt-4 text-style flex items-center justify-center">
          <LoadingSpinner />
          Waiting for other players.
        </div>
      )}
      {answersSubmitted && isHost && !allPlayersReady && (
        <div className="pt-4 text-style flex items-center justify-center">
          <LoadingSpinner />
          Waiting for other players.
        </div>
      )}
      {allPlayersReady && (
        <div className="pt-4 text-style flex items-center justify-center">
          All Players ready, waiting for host to start.
        </div>
      )}
      {isHost && allPlayersReady && (
        <button
          disabled={buttonDisabled}
          onClick={() => startGame()}
          className="mt-4 p-2 mx-auto w-full rounded bg-[#FF0000] font-bold border-black border-4 text-black text-2xl"
        >
          Start Game (You're the host)
        </button>
      )}
      {/* <ChatRoom
        socket={socket}
        io={io}
        roomName={roomName}
        // customUsername={customUsername}
        username={username}
      /> */}
    </div>
  );
}

export default PreGame;
