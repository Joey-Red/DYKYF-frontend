import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setButtonHidden(false);
    }, 2000);
  }, []);
  // let floatingAnswer;
  useEffect(() => {
    // console.log(
    //   correctAnswerColor,
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer
    // );
    // let corrAns =
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer;
    // let floatVar =
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ];
    socket.on("game over", (data) => {
      setGameOver(true);
    });
    socket.on("next question", (data) => {
      // console.log(floatVar);
      // console.log(checkCords(players));
      // console.log(data.correctAnswerColor);

      setCorrectAnswerColor(data.corrAnswerColor);
      setCurrentQuestionIndex((prevIndex) => {
        return (prevIndex + 1) % (questionArray.length * 3);
      });
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
    // if (
    //   correctAnswerColor === "red" &&
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer !==
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerA
    // ) {
    //   floatingAnswer =
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerA;
    // }
    // if (
    //   correctAnswerColor === "blue" &&
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer !==
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerB
    // ) {
    //   floatingAnswer =
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerB;
    // }
    // if (
    //   correctAnswerColor === "green" &&
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer !==
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerC
    // ) {
    //   floatingAnswer =
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerC;
    // }
    // if (
    //   correctAnswerColor === "orange" &&
    //   questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //     currentQuestionIndex % 3
    //   ].correctAnswer !==
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerD
    // ) {
    //   floatingAnswer =
    //     questionArray[Math.floor(currentQuestionIndex / 3)].questions[
    //       currentQuestionIndex % 3
    //     ].answerD;
    // }
    console.log(
      "corrAColor: ",
      correctAnswerColor,
      "corrA: ",
      questionArray[Math.floor(currentQuestionIndex / 3)].questions[
        currentQuestionIndex % 3
      ].correctAnswer,
      "FloatA: ",
      floatingAnswer
    );
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

  function checkCords(localPlayers) {
    const result = {};
    // console.log(result)
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
    }, 5000);
    return () => clearTimeout(timer);
  }
  const handleNextQuestion = () => {
    console.log(currLocs);
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
          {/* {correctAnswerColor === "red" ? (
              // need to move inside the P element
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            ) : (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].answerA
                }
              </>
            )} */}

          {/* <p className="bg-[blue] border-4 border-black rounded">
            {correctAnswerColor === "blue" ? (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            ) : (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].answerB
                }
              </>
            )}
          </p>
          <p className="bg-[green] border-4 border-black rounded">
            {correctAnswerColor === "green" ? (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            ) : (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].answerC
                }
              </>
            )}
          </p>
          <p className="bg-[orange] border-4 border-black rounded">
            {correctAnswerColor === "orange" ? (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].correctAnswer
                }
              </>
            ) : (
              <>
                {
                  questionArray[Math.floor(currentQuestionIndex / 3)].questions[
                    currentQuestionIndex % 3
                  ].answerD
                }
              </>
            )}
          </p> */}
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
