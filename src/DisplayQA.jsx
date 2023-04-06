import React, { useEffect, useState, useMemo } from "react";
import { redRect, blueRect, greenRect, orangeRect } from "./canvasVariables";
function DisplayQAList(props) {
  const {
    QAArray,
    isHost,
    socket,
    io,
    roomName,
    players,
    username,
    correctAnswerColor,
    setCorrectAnswerColor,
  } = props;
  const [questionArray, setQuestionArray] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [currLocs, setCurrLocs] = useState({});
  const [buttonHidden, setButtonHidden] = useState(true);
  const [floatingAnswer, setFloatingAnswer] = useState("");
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [scoreboard, setScoreboard] = useState();
  const [scores, setScores] = useState({});
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setButtonHidden(false);
    }, 9000);
  }, []);
  // let floatingAnswer;
  useEffect(() => {
    socket.on("game over", (data) => {
      setGameOver(true);
    });
    socket.on("next question", (data) => {
      // console.log(floatVar);
      // console.log(checkCords(players));
      // console.log(data.correctAnswerColor);
      setShowCorrectAnswer(true);
      setTimeout(() => {
        setShowCorrectAnswer(false);
        setCorrectAnswerColor(data.corrAnswerColor);
        setCurrentQuestionIndex((prevIndex) => {
          return (prevIndex + 1) % (questionArray.length * 3);
        });
      }, 3000);
      // CALCULATE POINTS
      // If player got points, ++
      // maybe balloons at end or if + point?
      // setScore()
    });
  }, [socket]);
  useEffect(() => {
    if (
      correctAnswerColor === "red" &&
      questionArray[Math.floor(currentQuestionIndex / 3)].questions[
        currentQuestionIndex % 3
      ].correctAnswer !==
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerA
    ) {
      setFloatingAnswer(
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerA
      );
    }
    if (
      correctAnswerColor === "blue" &&
      questionArray[Math.floor(currentQuestionIndex / 3)].questions[
        currentQuestionIndex % 3
      ].correctAnswer !==
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerB
    ) {
      setFloatingAnswer(
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerB
      );
    }
    if (
      correctAnswerColor === "green" &&
      questionArray[Math.floor(currentQuestionIndex / 3)].questions[
        currentQuestionIndex % 3
      ].correctAnswer !==
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerC
    ) {
      setFloatingAnswer(
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerC
      );
    }
    if (
      correctAnswerColor === "orange" &&
      questionArray[Math.floor(currentQuestionIndex / 3)].questions[
        currentQuestionIndex % 3
      ].correctAnswer !==
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerD
    ) {
      setFloatingAnswer(
        questionArray[Math.floor(currentQuestionIndex / 3)].questions[
          currentQuestionIndex % 3
        ].answerD
      );
    }
    // console.log(
    //   "corrAColor: ",
    //   correctAnswerColor,
    //   "corrA: ",
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer,
    //   "FloatA: ",
    //   floatingAnswer
    // );
  }, [currentQuestionIndex, correctAnswerColor, floatingAnswer]);
  // }, [currentQuestionIndex, correctAnswerColor]);

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

  // function checkCords(localPlayers) {
  //   const result = {};
  //   // console.log(result)
  //   for (const username in localPlayers) {
  //     const { spriteX, spriteY } = localPlayers[username];
  //     const shape = getShape(spriteX, spriteY);
  //     result[username] = shape;
  //   }
  //   return result;
  // }
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
              answerD: questionOne.d,
              correctAnswer: answers.answerOne,
            },
            {
              question: questionTwo.question,
              answerA: questionTwo.a,
              answerB: questionTwo.b,
              answerC: questionTwo.c,
              answerD: questionTwo.d,

              correctAnswer: answers.answerTwo,
            },
            {
              question: questionThree.question,
              answerA: questionThree.a,
              answerB: questionThree.b,
              answerC: questionThree.c,
              answerD: questionThree.d,

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
    }, 7000);
    return () => clearTimeout(timer);
  }
  function checkPlayers() {
    // console.log(currLocs);
    for (const username in players) {
      // for (const [player, color] of Object.entries(players)) {
      // console.log(currLocs[username]);
      if (currLocs[username] === correctAnswerColor) {
        // setScoreboard({
        //   ...scoreboard,
        //   username: username,
        //   points: points++,
        // });
        const updatedScores = {
          ...scores,
          [username]: (scores[username] || 0) + 1,
        };
        setScores(updatedScores);
        setScoreboard({
          ...scoreboard,
          username: username,
          points: updatedScores[username],
        });
      }
    }
  }
  useEffect(() => {
    for (const username in players) {
      const updatedScores = {
        ...scores,
        [username]: (scores[username] || 0) + 0,
      };
      setScores(updatedScores);
      setScoreboard({
        ...scoreboard,
        username: username,
        points: updatedScores[username],
      });
    }
  }, [players]);

  const handleNextQuestion = () => {
    // console.log(currLocs, "correct: ", correctAnswerColor);
    checkPlayers();
    // return result;
    hideButton();
    // HIDE BUTTON FOR A FEW SECONDS AFTER CLICK
    // const nextIndex = (currentQuestionIndex + 1) % questionArray.length;
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
    <div className="relative">
      {!showScoreboard && !showCorrectAnswer && (
        <button
          onClick={() => setShowScoreboard(!showScoreboard)}
          className="absolute top-0 left-0 text-[red]"
        >
          Score
        </button>
      )}
      {showScoreboard && !showCorrectAnswer && (
        <div className="absolute text-center left-0 right-0 top-0 bottom-0 bg-neutral-900/95 z-[999]">
          <p>Scoreboard</p>
          <button
            onClick={() => setShowScoreboard(!showScoreboard)}
            className="absolute top-0 left-0 text-[red]"
          >
            Close
          </button>
          <div className="max-h-calc-full-minus-x overflow-y-auto ">
            {Object.entries(scores).map(([username, score]) => (
              <p key={username}>{`${username}: ${score}`}</p>
            ))}
          </div>
        </div>
      )}
      {!loading && !gameOver && !showCorrectAnswer && (
        <div className="flex flex-col gap-2 text-center max-w-[90vw]">
          <h3>
            {questionArray[Math.floor(currentQuestionIndex / 3)].username ===
            username ? (
              <p>YOU</p>
            ) : (
              <>
                {questionArray[Math.floor(currentQuestionIndex / 3)].username}
              </>
            )}
          </h3>
          <h3>
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].question
            }
          </h3>
          {/* Ans 1 */}
          <p className="bg-[red] border-4 border-black rounded">
            {correctAnswerColor === "red" && (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            )}
            {correctAnswerColor !== "red" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerA ===
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && <>{floatingAnswer}</>}

            {correctAnswerColor !== "red" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerA !==
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && (
                <>
                  {
                    questionArray[Math.floor(currentQuestionIndex / 3)]
                      .questions[currentQuestionIndex % 3].answerA
                  }
                </>
              )}
          </p>

          {/* Ans 2 */}
          <p className="bg-[blue] border-4 border-black rounded">
            {correctAnswerColor === "blue" && (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            )}
            {correctAnswerColor !== "blue" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerB ===
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && <>{floatingAnswer}</>}

            {correctAnswerColor !== "blue" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerB !==
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && (
                <>
                  {
                    questionArray[Math.floor(currentQuestionIndex / 3)]
                      .questions[currentQuestionIndex % 3].answerB
                  }
                </>
              )}
          </p>
          {/* Ans 3 */}
          <p className="bg-[green] border-4 border-black rounded">
            {correctAnswerColor === "green" && (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            )}
            {correctAnswerColor !== "green" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerC ===
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && <>{floatingAnswer}</>}
            {correctAnswerColor !== "green" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerC !==
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && (
                <>
                  {
                    questionArray[Math.floor(currentQuestionIndex / 3)]
                      .questions[currentQuestionIndex % 3].answerC
                  }
                </>
              )}
          </p>
          {/* Ans 4 */}
          <p className="bg-[orange] border-4 border-black rounded">
            {correctAnswerColor === "orange" && (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            )}
            {correctAnswerColor !== "orange" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerD ===
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && <>{floatingAnswer}</>}
            {correctAnswerColor !== "orange" &&
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].answerD !==
                questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                  currentQuestionIndex % 3
                ].correctAnswer && (
                <>
                  {
                    questionArray[Math.floor(currentQuestionIndex / 3)]
                      .questions[currentQuestionIndex % 3].answerD
                  }
                </>
              )}
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
      )}{" "}
      {showCorrectAnswer && (
        <div
          className={
            isHost
              ? `h-[246.65px] flex items-center justify-end w-full flex-col`
              : `h-[222.64px] flex items-center justify-end w-full flex-col`
          }
        >
          <h3>
            <div className="flex">
              {questionArray[Math.floor(currentQuestionIndex / 3)].username ===
              username ? (
                <>YOU</>
              ) : (
                <>
                  {questionArray[Math.floor(currentQuestionIndex / 3)].username}
                </>
              )}{" "}
              Said:
            </div>
          </h3>
          <p
            className={`bg-[${correctAnswerColor}] mb-4 min-w-[430px] w-full text-center border-4 border-black rounded`}
          >
            {
              questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                currentQuestionIndex % 3
              ].correctAnswer
            }
          </p>
        </div>
      )}
      {gameOver && <>Game Over!</>}
    </div>
  );
}

export default DisplayQAList;
