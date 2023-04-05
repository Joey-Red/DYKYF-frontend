import React, { useEffect, useState } from "react";
import { redRect, blueRect, greenRect, orangeRect } from "./canvasVariables";
function DisplayQAList(props) {
  const { QAArray, isHost, socket, io, roomName, players } = props;
  const [questionArray, setQuestionArray] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [currLocs, setCurrLocs] = useState({});
  const [buttonHidden, setButtonHidden] = useState(true);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setButtonHidden(false);
    }, 5000);
  }, []);

  useEffect(() => {
    socket.on("game over", (data) => {
      setGameOver(true);
    });
    socket.on("next question", (data) => {
      // console.log(checkCords(players));
      console.log(currLocs);
      setCurrentQuestionIndex((prevIndex) => {
        return (prevIndex + 1) % (questionArray.length * 3);
      });
    });
    setCurrentQuestionIndex(
      (currentQuestionIndex + 1) % (questionArray.length * 3)
    );
  }, [socket]);

  // currentQuestionIndex;
  useEffect(() => {
    //  function checkCords(localPlayers) {
    const result = {};
    // console.log(result)
    for (const username in players) {
      const { spriteX, spriteY } = players[username];
      const shape = getShape(spriteX, spriteY);
      result[username] = shape;
    }
    //  return result;
    setCurrLocs((currLocs) => result);
    //  }
  }, [players]);

  function checkCords(localPlayers) {
    const result = {};
    // console.log(result)
    console.log("lp cc: ", localPlayers);
    for (const username in localPlayers) {
      const { spriteX, spriteY } = localPlayers[username];
      const shape = getShape(spriteX, spriteY);
      result[username] = shape;
    }
    return result;
  }
  useState(() => {
    const newQuestionArray = QAArray.playerAnswersArray.map(
      ({ username, answers }) => {
        const { questionOne, questionTwo, questionThree } = answers;
        return {
          username,
          questions: [
            {
              question: questionOne.question,
              answerA: questionOne.a,
              answerB: questionOne.b,
              answerC: questionOne.c,
              correctAnswer: answers.answerOne,
            },
            {
              question: questionTwo.question,
              answerA: questionTwo.a,
              answerB: questionTwo.b,
              answerC: questionTwo.c,
              correctAnswer: answers.answerTwo,
            },
            {
              question: questionThree.question,
              answerA: questionThree.a,
              answerB: questionThree.b,
              answerC: questionThree.c,
              correctAnswer: answers.answerThree,
            },
          ],
        };
      }
    );
    setQuestionArray(newQuestionArray);
    setLoading(false);
  }, []);
  function hideButton() {
    setButtonHidden(true);
    let timer;
    timer = setTimeout(() => {
      setButtonHidden(false);
    }, 5000);
    return () => clearTimeout(timer);
  }
  const handleNextQuestion = () => {
    hideButton();
    // HIDE BUTTON FOR A FEW SECONDS AFTER CLICK
    const nextIndex = (currentQuestionIndex + 1) % questionArray.length;
    const totalQuestions = questionArray.length * 3;

    if (totalQuestions === currentQuestionIndex + 1) {
      socket.emit("game over", {
        roomName: roomName,
        // SCORE DATA HERE
      });
    } else {
      socket.emit("go next question", {
        roomName: roomName,
      });
    }
  };

  function isInsideRect(x, y, rect) {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );
  }
  function getShape(spriteX, spriteY) {
    if (isInsideRect(spriteX, spriteY, redRect)) {
      return "red";
    } else if (isInsideRect(spriteX, spriteY, blueRect)) {
      return "blue";
    } else if (isInsideRect(spriteX, spriteY, greenRect)) {
      return "green";
    } else if (isInsideRect(spriteX, spriteY, orangeRect)) {
      return "orange";
    } else {
      return "not in shape";
    }
  }
  return (
    <div>
      {!loading && !gameOver && (
        <div className="flex flex-col gap-2 text-center">
          <h3>
            {questionArray[Math.floor(currentQuestionIndex / 3)].username}
          </h3>
          <h3>
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].question
            }
          </h3>
          <p className="bg-[red] border-4 border-black rounded">
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerA
            }
          </p>
          <p className="bg-[blue] border-4 border-black rounded">
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerB
            }
          </p>
          <p className="bg-[green] border-4 border-black rounded">
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerC
            }
          </p>
          {isHost && buttonHidden && <div className="h-[24.01px] mb-1"></div>}
          {isHost && !buttonHidden && (
            <>
              <button
                className="w-fit mx-auto mb-1"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            </>
          )}
          {!isHost && <div className="h-1"></div>}
        </div>
      )}
      {gameOver && <>Game Over!</>}
    </div>
  );
}

export default DisplayQAList;
